export interface HanziWord {
  id: string;
  hanzi: string;
  pinyin: string; // e.g. "nǐ hǎo" or "ni3 hao3"
  pinyinClean: string; // e.g. "nihao" (lowercase, no tone marks, no spaces)
  pinyinNumbered?: string; // e.g. "ni3hao3"
  pinyinSpaced?: string; // e.g. "ni hao"
  english: string;
  hskLevel?: number; // 1-6
  category?: string;
}

export interface ActiveProjectile {
  id: string;
  word: HanziWord;
  x: number; // percentage 5% - 95%
  y: number; // percentage 0% - 100% (100% is base hit)
  speed: number; // percentage per second
  hp: number; // normally 1, bosses can have 2-4
  maxHp: number;
  size: number;
  rotation: number;
  color: string;
  isTargeted: boolean;
  spawnTime: number;
  hazardType?: 'normal' | 'fast' | 'shielded' | 'boss';
}

export interface LaserBeam {
  id: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  color: string;
  createdAt: number;
  duration: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  createdAt: number;
  duration: number;
  scale?: number;
}

export type GameState = 'menu' | 'playing' | 'paused' | 'level_complete' | 'game_over' | 'victory';

export type GameMode = 'campaign' | 'endless' | 'practice' | 'custom';

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  showPinyinHint: boolean; // Show pinyin above falling Hanzi
  showEnglishHint: boolean; // Show english translation tooltip
  speakOnHit: boolean; // Speak Chinese word on destruction
  baseSpeedMultiplier: number; // 0.8x to 2.0x
  autoFocusInput: boolean;
}

export interface LevelConfig {
  level: number;
  name: string;
  description: string;
  fallSpeed: number; // Base fall speed
  spawnInterval: number; // ms between spawns
  targetWordsCount: number; // Words to destroy to win level
  maxActiveWords: number;
  allowedWordLengths: number[];
  hskLevels: number[];
  hasBoss?: boolean;
}

export interface WordListPreset {
  id: string;
  name: string;
  description: string;
  category: string;
  words: HanziWord[];
  isCustom?: boolean;
}

export interface GameStats {
  score: number;
  level: number;
  combo: number;
  maxCombo: number;
  wordsDestroyed: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  startTime: number;
  endTime?: number;
  destroyedWordHistory: HanziWord[];
  missedWordHistory: HanziWord[];
  wrongWordHistory: HanziWord[];
}
