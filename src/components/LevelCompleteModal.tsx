import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCcw, Trophy, Zap, Target } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LevelCompleteModalProps {
  level: number;
  score: number;
  wordsDestroyed: number;
  accuracy: number;
  nextSpeedMultiplier: number;
  onNextLevel: () => void;
  onReplayLevel: () => void;
  onReturnToMenu: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  level,
  score,
  wordsDestroyed,
  accuracy,
  nextSpeedMultiplier,
  onNextLevel,
  onReplayLevel,
  onReturnToMenu,
}) => {
  useEffect(() => {
    sounds.playLevelUp();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#34d399', '#fbbf24'],
    });
  }, []);

  return (
    <div id="level-complete-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div id="level-complete-modal-box" className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden p-6 text-center">
        {/* Glow halo */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
          <Trophy className="w-10 h-10 text-emerald-400" />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-1">
          LEVEL {level} CLEARED!
        </h2>
        <p className="text-sm text-emerald-400 font-mono font-medium mb-6">
          Base Defense Wave Successfully Repelled
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Score</div>
            <div className="text-lg font-black text-sky-400">{score.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Destroyed</div>
            <div className="text-lg font-black text-emerald-400">{wordsDestroyed}</div>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Accuracy</div>
            <div className="text-lg font-black text-amber-400">{accuracy}%</div>
          </div>
        </div>

        {/* Next level warning notice */}
        <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl mb-6 flex items-center justify-center gap-2 text-amber-300 text-xs">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Next Level Velocity Boost: <strong className="text-amber-200">{nextSpeedMultiplier.toFixed(1)}x Speed</strong></span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onNextLevel}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <span>Proceed to Level {level + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onReplayLevel}
            className="w-full sm:w-auto px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-sm flex items-center justify-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay</span>
          </button>

          <button
            type="button"
            onClick={onReturnToMenu}
            className="w-full sm:w-auto px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold rounded-xl text-sm transition"
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
};
