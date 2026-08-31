import React from 'react';
import { Shield, Zap, Flame, Pause, Play, Volume2, VolumeX, BookOpen, Settings, Home } from 'lucide-react';
import { GameSettings } from '../types';

interface HUDProps {
  level: number;
  levelName: string;
  score: number;
  combo: number;
  baseHp: number;
  maxBaseHp: number;
  wordsDestroyedInLevel: number;
  targetWordsForLevel: number;
  speedMultiplier: number;
  isPaused: boolean;
  onTogglePause: () => void;
  settings: GameSettings;
  onUpdateSettings: (s: Partial<GameSettings>) => void;
  onOpenWordListModal: () => void;
  onOpenSettingsModal: () => void;
  onReturnToMenu: () => void;
  activePackName: string;
}

export const HUD: React.FC<HUDProps> = ({
  level,
  levelName,
  score,
  combo,
  baseHp,
  maxBaseHp,
  wordsDestroyedInLevel,
  targetWordsForLevel,
  speedMultiplier,
  isPaused,
  onTogglePause,
  settings,
  onUpdateSettings,
  onOpenWordListModal,
  onOpenSettingsModal,
  onReturnToMenu,
  activePackName,
}) => {
  const progressPercent = Math.min(100, Math.round((wordsDestroyedInLevel / Math.max(1, targetWordsForLevel)) * 100));

  return (
    <header id="game-top-hud" className="w-full bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md px-4 py-2.5 text-white select-none z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Section: Home, Level Badge, Speed */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <button
            id="hud-home-btn"
            type="button"
            onClick={onReturnToMenu}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-white transition"
            title="Return to Menu"
          >
            <Home className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-sky-600 rounded-lg text-xs font-black tracking-wider uppercase shadow-md">
              Level {level}
            </div>
            <div className="text-sm font-semibold text-slate-200 truncate max-w-[120px] sm:max-w-[180px]">
              {levelName}
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-600/40 rounded-lg text-xs font-mono text-amber-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{speedMultiplier.toFixed(1)}x SPD</span>
          </div>
        </div>

        {/* Center Section: Base Shields & Wave Progress */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-around md:justify-center">
          {/* Base Shield HP */}
          <div className="flex items-center gap-1.5">
            <Shield className={`w-4 h-4 ${baseHp > 1 ? 'text-sky-400' : 'text-rose-500 animate-pulse'}`} />
            <div className="flex gap-1">
              {Array.from({ length: maxBaseHp }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-4 h-5 rounded-sm transition-all duration-300 ${
                    idx < baseHp
                      ? 'bg-sky-400 shadow-sm shadow-sky-400/80'
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Level Progress Wave */}
          <div className="flex flex-col gap-1 w-32 sm:w-44">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>WAVE</span>
              <span className="text-sky-300 font-bold">
                {wordsDestroyedInLevel}/{targetWordsForLevel}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Combo Meter */}
          {combo > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-orange-950/60 border border-orange-500/50 rounded-lg text-orange-300 animate-bounce">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-xs font-mono font-bold">{combo}x COMBO</span>
            </div>
          )}
        </div>

        {/* Right Section: Score, Word Pack badge & Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Score */}
          <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Score</span>
            <span className="text-lg font-mono font-black text-sky-300 tracking-wider">
              {score.toLocaleString()}
            </span>
          </div>

          {/* Word Pack Indicator */}
          <button
            id="hud-word-pack-btn"
            type="button"
            onClick={onOpenWordListModal}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500 rounded-lg text-xs text-slate-300 transition"
            title="Switch or import custom word lists"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span className="max-w-[80px] sm:max-w-[110px] truncate">{activePackName}</span>
          </button>

          {/* Pause / Play */}
          <button
            id="hud-pause-btn"
            type="button"
            onClick={onTogglePause}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-white transition"
            title={isPaused ? 'Resume (Esc)' : 'Pause (Esc)'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Mute / Unmute */}
          <button
            id="hud-sound-toggle-btn"
            type="button"
            onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-white transition"
            title={settings.soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Settings */}
          <button
            id="hud-settings-btn"
            type="button"
            onClick={onOpenSettingsModal}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-white transition"
            title="Game Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
