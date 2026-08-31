import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameState,
  GameMode,
  ActiveProjectile,
  LaserBeam,
  Particle,
  FloatingText,
  LevelConfig,
  GameStats,
  GameSettings,
  WordListPreset,
  HanziWord,
} from './types';
import { PRESET_WORD_PACKS } from './data/words';
import { LEVEL_CONFIGS } from './data/levels';
import { cleanPinyin } from './utils/pinyin';
import { sounds } from './utils/audio';

// Components
import { HUD } from './components/HUD';
import { GalaxyCanvas } from './components/GalaxyCanvas';
import { TypingInput } from './components/TypingInput';
import { StartScreen } from './components/StartScreen';
import { EndOfMatchModal } from './components/EndOfMatchModal';
import { WordListModal } from './components/WordListModal';
import { SettingsModal } from './components/SettingsModal';

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: false,
  soundVolume: 0.8,
  showPinyinHint: false, // Default off: purely Hanzi recognition + English meaning
  showEnglishHint: true,
  speakOnHit: false, // Voice after destroying words removed
  baseSpeedMultiplier: 1.0,
  autoFocusInput: true,
};

export default function App() {
  // Game States
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('campaign');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [baseHp, setBaseHp] = useState<number>(5);
  const [maxBaseHp] = useState<number>(5);
  const [wordsDestroyedInLevel, setWordsDestroyedInLevel] = useState<number>(0);
  const [totalWordsDestroyed, setTotalWordsDestroyed] = useState<number>(0);

  // Typing & Input
  const [currentInput, setCurrentInput] = useState<string>('');
  const [targetedProjectileId, setTargetedProjectileId] = useState<string | null>(null);
  const [turretAngle, setTurretAngle] = useState<number>(0);
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [screenShake, setScreenShake] = useState<number>(0);

  // Entities in Canvas
  const [projectiles, setProjectiles] = useState<ActiveProjectile[]>([]);
  const [laserBeams, setLaserBeams] = useState<LaserBeam[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Word Packs & Custom TXT
  const [selectedPack, setSelectedPack] = useState<WordListPreset>(PRESET_WORD_PACKS[0]);
  const [customPacks, setCustomPacks] = useState<WordListPreset[]>([]);
  const [isWordListModalOpen, setIsWordListModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // Settings & Storage
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [highScore, setHighScore] = useState<number>(0);

  // Stats for review
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    wordsDestroyed: 0,
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    startTime: Date.now(),
    destroyedWordHistory: [],
    missedWordHistory: [],
    wrongWordHistory: [],
  });

  // Animation & Loop Refs for robust 60fps simulation
  const projectilesRef = useRef<ActiveProjectile[]>([]);
  const lastTimeRef = useRef<number>(Date.now());
  const lastSpawnTimeRef = useRef<number>(0);
  const stateRef = useRef({
    gameState,
    baseHp,
    currentLevel,
    gameMode,
    settings,
    selectedPack,
    wordsDestroyedInLevel,
  });

  // Keep stateRef fresh for requestAnimationFrame loop
  useEffect(() => {
    stateRef.current = {
      gameState,
      baseHp,
      currentLevel,
      gameMode,
      settings,
      selectedPack,
      wordsDestroyedInLevel,
    };
  }, [
    gameState,
    baseHp,
    currentLevel,
    gameMode,
    settings,
    selectedPack,
    wordsDestroyedInLevel,
  ]);

  // Load Saved High Scores & Custom Word Packs from localStorage
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('hanzi_galaxy_high_score');
      if (savedScore) setHighScore(parseInt(savedScore, 10) || 0);

      const savedPacks = localStorage.getItem('hanzi_galaxy_custom_packs');
      if (savedPacks) {
        const parsed = JSON.parse(savedPacks);
        if (Array.isArray(parsed)) setCustomPacks(parsed);
      }

      const savedSettings = localStorage.getItem('hanzi_galaxy_settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Update Settings
  const handleUpdateSettings = (updated: Partial<GameSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('hanzi_galaxy_settings', JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save settings:', e);
      }
      return next;
    });
  };

  // Save Custom Pack
  const handleSaveCustomPack = (newPack: WordListPreset) => {
    setCustomPacks(prev => {
      const filtered = prev.filter(p => p.id !== newPack.id);
      const updated = [newPack, ...filtered];
      try {
        localStorage.setItem('hanzi_galaxy_custom_packs', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save custom pack:', e);
      }
      return updated;
    });
  };

  // Delete Custom Pack
  const handleDeleteCustomPack = (packId: string) => {
    setCustomPacks(prev => {
      const updated = prev.filter(p => p.id !== packId);
      try {
        localStorage.setItem('hanzi_galaxy_custom_packs', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to delete pack:', e);
      }
      return updated;
    });
    if (selectedPack.id === packId) {
      setSelectedPack(PRESET_WORD_PACKS[0]);
    }
  };

  // Get current level configuration
  const currentConfig: LevelConfig = LEVEL_CONFIGS[(currentLevel - 1) % LEVEL_CONFIGS.length] || LEVEL_CONFIGS[0];
  const speedMultiplier = settings.baseSpeedMultiplier * (1 + (currentLevel - 1) * 0.18);

  // Create explosion particles helper
  const createExplosionParticles = (x: number, y: number, color: string, count: number = 20) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      newParticles.push({
        id: `p-${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 4 + 2,
        alpha: 1,
        life: 0.4 + Math.random() * 0.3,
        maxLife: 0.7,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  // Add floating combat text
  const addFloatingText = (text: string, x: number, y: number, color: string = '#38bdf8') => {
    const newText: FloatingText = {
      id: `ft-${Date.now()}-${Math.random()}`,
      text,
      x,
      y,
      color,
      createdAt: Date.now(),
      duration: 1000,
    };
    setFloatingTexts(prev => [...prev, newText]);
  };

  // Helper to generate a new Hanzi projectile
  const createProjectile = useCallback((): ActiveProjectile | null => {
    const activePack = stateRef.current.selectedPack || PRESET_WORD_PACKS[0];
    const wordList = activePack.words;
    if (!wordList || wordList.length === 0) return null;

    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    const id = `meteor-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const x = Math.floor(Math.random() * 70) + 15; // 15% to 85% width
    const y = 4; // Start near top

    const levelCfg = LEVEL_CONFIGS[(stateRef.current.currentLevel - 1) % LEVEL_CONFIGS.length] || LEVEL_CONFIGS[0];
    const baseSpeed = levelCfg.fallSpeed * stateRef.current.settings.baseSpeedMultiplier * (1 + (stateRef.current.currentLevel - 1) * 0.15);
    const lengthSpeedModifier = randomWord.hanzi.length > 2 ? 0.85 : 1.0;
    const finalSpeed = baseSpeed * lengthSpeedModifier * (0.9 + Math.random() * 0.2);

    const isBossWave = levelCfg.hasBoss && Math.random() < 0.15 && randomWord.hanzi.length >= 3;
    const isFastWave = !isBossWave && Math.random() < 0.2;

    return {
      id,
      word: randomWord,
      x,
      y,
      speed: isFastWave ? finalSpeed * 1.35 : finalSpeed,
      hp: isBossWave ? 2 : 1,
      maxHp: isBossWave ? 2 : 1,
      size: 40,
      rotation: 0,
      color: isBossWave ? '#ef4444' : isFastWave ? '#f59e0b' : '#38bdf8',
      isTargeted: false,
      spawnTime: Date.now(),
      hazardType: isBossWave ? 'boss' : isFastWave ? 'fast' : 'normal',
    };
  }, []);

  // Start new game
  const handleStartGame = (mode: GameMode, startLvl: number = 1) => {
    setGameState('playing');
    setGameMode(mode);
    setCurrentLevel(startLvl);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setBaseHp(maxBaseHp);
    setWordsDestroyedInLevel(0);
    setTotalWordsDestroyed(0);
    setLaserBeams([]);
    setParticles([]);
    setFloatingTexts([]);
    setCurrentInput('');
    setTargetedProjectileId(null);
    setStats({
      score: 0,
      level: startLvl,
      combo: 0,
      maxCombo: 0,
      wordsDestroyed: 0,
      totalKeystrokes: 0,
      correctKeystrokes: 0,
      startTime: Date.now(),
      destroyedWordHistory: [],
      missedWordHistory: [],
      wrongWordHistory: [],
    });

    // Spawn 2 initial projectiles right away so screen is immediately active
    const initialList: ActiveProjectile[] = [];
    const p1 = createProjectile();
    if (p1) {
      p1.y = 8;
      p1.x = 35;
      initialList.push(p1);
    }
    const p2 = createProjectile();
    if (p2) {
      p2.y = 18;
      p2.x = 65;
      initialList.push(p2);
    }

    projectilesRef.current = initialList;
    setProjectiles(initialList);
    lastTimeRef.current = Date.now();
    lastSpawnTimeRef.current = Date.now();
  };

  // Main Game Loop (Physics, Movement, Collision, Spawning)
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const now = Date.now();
      const delta = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      if (stateRef.current.gameState === 'playing') {
        const levelCfg = LEVEL_CONFIGS[(stateRef.current.currentLevel - 1) % LEVEL_CONFIGS.length] || LEVEL_CONFIGS[0];
        const maxActive = Math.min(10, levelCfg.maxActiveWords);
        const baseInterval = projectilesRef.current.length < 2 ? 450 : levelCfg.spawnInterval;
        const spawnDelay = Math.max(350, baseInterval / (1 + (stateRef.current.currentLevel - 1) * 0.18));

        // 1. Spawning check
        if (projectilesRef.current.length < maxActive && now - lastSpawnTimeRef.current >= spawnDelay) {
          const newProj = createProjectile();
          if (newProj) {
            projectilesRef.current.push(newProj);
          }
          lastSpawnTimeRef.current = now;
        }

        // 2. Projectile Movement & Shield Collisions
        let baseDamaged = false;
        const remaining: ActiveProjectile[] = [];
        const missedWords: HanziWord[] = [];

        for (const p of projectilesRef.current) {
          const nextY = p.y + p.speed * delta;

          // Check if meteor hits base shield (y >= 88%)
          if (nextY >= 88) {
            baseDamaged = true;
            missedWords.push(p.word);
            createExplosionParticles(p.x, 88, '#ef4444', 15);
          } else {
            remaining.push({
              ...p,
              y: nextY,
            });
          }
        }

        projectilesRef.current = remaining;
        setProjectiles([...remaining]);

        if (baseDamaged) {
          sounds.playShieldDamage();
          setScreenShake(1.0);
          setCombo(0);
          setStats(s => ({
            ...s,
            missedWordHistory: [...s.missedWordHistory, ...missedWords],
          }));
          setBaseHp(hp => {
            const nextHp = hp - missedWords.length;
            if (nextHp <= 0) {
              handleGameOver();
              return 0;
            }
            return nextHp;
          });
        }

        // 3. Screen shake decay
        setScreenShake(s => Math.max(0, s - delta * 3));

        // 4. Particle updates
        setParticles(prev =>
          prev
            .map(p => ({
              ...p,
              x: p.x + p.vx * delta * 20,
              y: p.y + p.vy * delta * 20,
              life: p.life - delta,
              alpha: Math.max(0, p.life / p.maxLife),
            }))
            .filter(p => p.life > 0)
        );

        // 5. Cleanup laser beams, floating text
        setLaserBeams(prev => prev.filter(b => now - b.createdAt < b.duration));
        setFloatingTexts(prev => prev.filter(ft => now - ft.createdAt < ft.duration));
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [createProjectile]);

  // Auto-target and turret aim calculation
  useEffect(() => {
    if (projectiles.length === 0) {
      setTargetedProjectileId(null);
      setTurretAngle(0);
      return;
    }

    const cleanedInput = cleanPinyin(currentInput);

    let targetX = 50;
    let targetY = 10;
    let foundTargetId: string | null = null;

    if (cleanedInput) {
      const matches = projectiles.filter(p => p.word.pinyinClean.startsWith(cleanedInput));
      if (matches.length > 0) {
        matches.sort((a, b) => b.y - a.y);
        foundTargetId = matches[0].id;
        targetX = matches[0].x;
        targetY = matches[0].y;
      }
    }

    if (!foundTargetId) {
      const sortedByY = [...projectiles].sort((a, b) => b.y - a.y);
      if (sortedByY.length > 0) {
        foundTargetId = sortedByY[0].id;
        targetX = sortedByY[0].x;
        targetY = sortedByY[0].y;
      }
    }

    if (foundTargetId) {
      setTargetedProjectileId(foundTargetId);
      const dx = targetX - 50;
      const dy = targetY - 95;
      const angle = Math.atan2(dx, -dy);
      setTurretAngle(angle);
    }
  }, [currentInput, projectiles]);

  // Helper to find the best matching target projectile for given input (handles duplicates accurately)
  const findMatchingTarget = (inputVal: string): ActiveProjectile | null => {
    const cleaned = cleanPinyin(inputVal);
    if (!cleaned) return null;

    const matching = projectilesRef.current.filter(p => {
      const pClean = cleanPinyin(p.word.pinyinClean);
      const pOrigClean = cleanPinyin(p.word.pinyin);
      return pClean === cleaned || pOrigClean === cleaned;
    });

    if (matching.length === 0) return null;

    // Prioritize currently locked target if it is in the matching candidates
    const currentLocked = matching.find(p => p.id === targetedProjectileId);
    if (currentLocked) return currentLocked;

    // Otherwise prioritize the one closest to the base (highest y value)
    matching.sort((a, b) => b.y - a.y);
    return matching[0];
  };

  // Handle Typing Input Change
  const handleInputChange = (val: string) => {
    setCurrentInput(val);
    sounds.playKeyType();

    setStats(s => ({
      ...s,
      totalKeystrokes: s.totalKeystrokes + 1,
    }));
  };

  // Submit / Enter / Fire laser at matched or targeted word
  const handleFireSubmit = () => {
    const target = findMatchingTarget(currentInput);
    if (target) {
      fireAtTarget(target);
    } else {
      sounds.playError();
      // Record mistyped word from current target
      const targeted = projectilesRef.current.find(p => p.id === targetedProjectileId);
      if (targeted) {
        setStats(s => {
          if (s.wrongWordHistory.some(w => w.id === targeted.word.id)) return s;
          return {
            ...s,
            wrongWordHistory: [...s.wrongWordHistory, targeted.word],
          };
        });
      }
    }
  };

  // Fire laser beam and destroy / hit target
  const fireAtTarget = (target: ActiveProjectile) => {
    sounds.playLaser();
    setIsFiring(true);
    setTimeout(() => setIsFiring(false), 160);

    const newBeam: LaserBeam = {
      id: `laser-${Date.now()}-${Math.random()}`,
      startX: 50,
      startY: 95,
      targetX: target.x,
      targetY: target.y,
      color: target.hazardType === 'boss' ? '#f43f5e' : '#38bdf8',
      createdAt: Date.now(),
      duration: 200,
    };
    setLaserBeams(prev => [...prev, newBeam]);

    const nextHp = target.hp - 1;
    if (nextHp <= 0) {
      // Destroyed!
      sounds.playExplosion();
      createExplosionParticles(target.x, target.y, target.color, 24);

      // Combo & Scoring
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo(prev => Math.max(prev, nextCombo));
      if (nextCombo % 5 === 0) {
        sounds.playCombo(nextCombo);
      }

      const comboMultiplier = 1 + (nextCombo - 1) * 0.2;
      const basePoints = target.word.hanzi.length * 100;
      const earnedScore = Math.round(basePoints * comboMultiplier * speedMultiplier);

      setScore(prev => {
        const nextScore = prev + earnedScore;
        if (nextScore > highScore) {
          setHighScore(nextScore);
          try {
            localStorage.setItem('hanzi_galaxy_high_score', nextScore.toString());
          } catch (e) {
            console.warn('Score save error:', e);
          }
        }
        return nextScore;
      });

      addFloatingText(`+${earnedScore}${nextCombo > 1 ? ` (${nextCombo}x)` : ''}`, target.x, target.y, '#38bdf8');

      setWordsDestroyedInLevel(prev => {
        const nextDestroyed = prev + 1;
        if (gameMode === 'campaign' && nextDestroyed >= currentConfig.targetWordsCount) {
          handleLevelComplete();
        }
        return nextDestroyed;
      });
      setTotalWordsDestroyed(prev => prev + 1);

      setStats(s => ({
        ...s,
        wordsDestroyed: s.wordsDestroyed + 1,
        correctKeystrokes: s.correctKeystrokes + target.word.pinyinClean.length,
        destroyedWordHistory: [...s.destroyedWordHistory, target.word],
      }));

      // Update refs and state
      const remainingProjectiles = projectilesRef.current.filter(p => p.id !== target.id);
      projectilesRef.current = remainingProjectiles;
      setProjectiles([...remainingProjectiles]);

      // Retarget to next closest projectile immediately
      if (remainingProjectiles.length > 0) {
        const sorted = [...remainingProjectiles].sort((a, b) => b.y - a.y);
        setTargetedProjectileId(sorted[0].id);
        const dx = sorted[0].x - 50;
        const dy = sorted[0].y - 95;
        setTurretAngle(Math.atan2(dx, -dy));
      } else {
        setTargetedProjectileId(null);
        setTurretAngle(0);
      }
    } else {
      createExplosionParticles(target.x, target.y, '#f59e0b', 12);
      addFloatingText('SHIELD DAMAGED!', target.x, target.y, '#f59e0b');

      const updatedProjectiles = projectilesRef.current.map(p =>
        p.id === target.id ? { ...p, hp: nextHp } : p
      );
      projectilesRef.current = updatedProjectiles;
      setProjectiles([...updatedProjectiles]);
    }

    setCurrentInput('');
  };

  // Level Clear Handler
  const handleLevelComplete = () => {
    setGameState('level_complete');
    sounds.playLevelUp();
  };

  // Next Level Handler
  const handleProceedNextLevel = () => {
    const nextLvl = currentLevel + 1;
    setCurrentLevel(nextLvl);
    setWordsDestroyedInLevel(0);

    const initialList: ActiveProjectile[] = [];
    const p1 = createProjectile();
    if (p1) {
      p1.y = 8;
      p1.x = 40;
      initialList.push(p1);
    }
    projectilesRef.current = initialList;
    setProjectiles(initialList);
    setLaserBeams([]);
    setParticles([]);
    setCurrentInput('');
    setGameState('playing');
    lastTimeRef.current = Date.now();
    lastSpawnTimeRef.current = Date.now();
  };

  // Game Over Handler
  const handleGameOver = () => {
    setGameState('game_over');
    setStats(s => ({
      ...s,
      endTime: Date.now(),
    }));
  };

  // Restart Current Game / Level
  const handleRestart = () => {
    handleStartGame(gameMode, 1);
  };

  const handleReplayLevel = () => {
    handleStartGame(gameMode, currentLevel);
  };

  // Pause toggle
  const handleTogglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
      lastTimeRef.current = Date.now();
      lastSpawnTimeRef.current = Date.now();
    }
  };

  // Global keyboard shortcuts (Escape to pause)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (gameState === 'playing' || gameState === 'paused') {
          handleTogglePause();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [gameState]);

  // Compute Typing Accuracy & WPM
  const accuracy = stats.totalKeystrokes > 0
    ? Math.min(100, Math.round((stats.correctKeystrokes / stats.totalKeystrokes) * 100))
    : 100;
  const elapsedMinutes = Math.max(0.1, ((stats.endTime || Date.now()) - stats.startTime) / 60000);
  const wpm = Math.round((stats.wordsDestroyed / elapsedMinutes) || 0);

  // Active targeted object
  const targetedProjectile = projectiles.find(p => p.id === targetedProjectileId) || null;

  return (
    <div id="hanzi-galaxy-app" className="relative w-full h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* 1. START MENU SCREEN */}
      {gameState === 'menu' && (
        <StartScreen
          onStartGame={handleStartGame}
          selectedPack={selectedPack}
          onOpenWordListModal={() => setIsWordListModalOpen(true)}
          onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
          highScore={highScore}
        />
      )}

      {/* 2. ACTIVE GAMEPLAY & PAUSE SCREENS */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
          {/* Top HUD */}
          <HUD
            level={currentLevel}
            levelName={currentConfig.name}
            score={score}
            combo={combo}
            baseHp={baseHp}
            maxBaseHp={maxBaseHp}
            wordsDestroyedInLevel={wordsDestroyedInLevel}
            targetWordsForLevel={currentConfig.targetWordsCount}
            speedMultiplier={speedMultiplier}
            isPaused={gameState === 'paused'}
            onTogglePause={handleTogglePause}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onOpenWordListModal={() => setIsWordListModalOpen(true)}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
            onReturnToMenu={() => setGameState('menu')}
            activePackName={selectedPack.name}
          />

          {/* Main Interactive Galaxy Canvas Area */}
          <div className="relative flex-1 w-full min-h-0">
            <GalaxyCanvas
              projectiles={projectiles}
              laserBeams={laserBeams}
              particles={particles}
              floatingTexts={floatingTexts}
              baseHp={baseHp}
              maxBaseHp={maxBaseHp}
              currentInput={currentInput}
              targetedProjectileId={targetedProjectileId}
              turretAngle={turretAngle}
              isFiring={isFiring}
              settings={settings}
              screenShake={screenShake}
            />

            {/* Pause Overlay */}
            {gameState === 'paused' && (
              <div
                id="pause-overlay"
                className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-40 animate-fadeIn"
              >
                <div className="p-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-center max-w-sm w-full">
                  <h3 className="text-2xl font-black text-white mb-2">GAME PAUSED</h3>
                  <p className="text-xs text-slate-400 mb-6">Press Escape or click Resume to continue defense.</p>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleTogglePause}
                      className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm transition cursor-pointer"
                    >
                      Resume Defense
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartGame(gameMode, currentLevel)}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition cursor-pointer"
                    >
                      Restart Level
                    </button>
                    <button
                      type="button"
                      onClick={() => setGameState('menu')}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-semibold rounded-xl text-sm transition cursor-pointer"
                    >
                      Quit to Main Menu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Typing Command Bar */}
          <div className="pb-4 pt-1 flex-shrink-0">
            <TypingInput
              currentInput={currentInput}
              onInputChange={handleInputChange}
              onSubmit={handleFireSubmit}
              targetedProjectile={targetedProjectile}
              autoFocus={settings.autoFocusInput}
              disabled={gameState === 'paused'}
              showEnglishHint={settings.showEnglishHint}
            />
          </div>
        </div>
      )}

      {/* 3. LEVEL COMPLETE / SECTOR CLEARED END OF MATCH UI */}
      {gameState === 'level_complete' && (
        <EndOfMatchModal
          isVictory={true}
          score={score}
          level={currentLevel}
          levelName={currentConfig.name}
          maxCombo={maxCombo}
          wordsDestroyed={wordsDestroyedInLevel}
          accuracy={accuracy}
          wpm={wpm}
          missedWords={stats.missedWordHistory}
          wrongWords={stats.wrongWordHistory}
          destroyedWords={stats.destroyedWordHistory}
          nextSpeedMultiplier={settings.baseSpeedMultiplier * (1 + currentLevel * 0.18)}
          onRestart={handleReplayLevel}
          onProceedNextLevel={handleProceedNextLevel}
          onReturnToMenu={() => setGameState('menu')}
        />
      )}

      {/* 4. BASE COMPROMISED / GAME OVER END OF MATCH UI */}
      {gameState === 'game_over' && (
        <EndOfMatchModal
          isVictory={false}
          score={score}
          level={currentLevel}
          levelName={currentConfig.name}
          maxCombo={maxCombo}
          wordsDestroyed={totalWordsDestroyed}
          accuracy={accuracy}
          wpm={wpm}
          missedWords={stats.missedWordHistory}
          wrongWords={stats.wrongWordHistory}
          destroyedWords={stats.destroyedWordHistory}
          onRestart={handleRestart}
          onReturnToMenu={() => setGameState('menu')}
        />
      )}

      {/* 5. WORD LIST & TXT MODAL */}
      <WordListModal
        isOpen={isWordListModalOpen}
        onClose={() => setIsWordListModalOpen(false)}
        currentPackId={selectedPack.id}
        customPacks={customPacks}
        onSelectPack={(pack) => setSelectedPack(pack)}
        onSaveCustomPack={handleSaveCustomPack}
        onDeleteCustomPack={handleDeleteCustomPack}
      />

      {/* 6. SETTINGS MODAL */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}
