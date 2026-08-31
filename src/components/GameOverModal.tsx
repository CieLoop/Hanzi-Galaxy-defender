import React from 'react';
import { RotateCcw, Home, Volume2, ShieldAlert, Award, Flame, Zap } from 'lucide-react';
import { HanziWord } from '../types';
import { speakChinese } from '../utils/pinyin';

interface GameOverModalProps {
  score: number;
  level: number;
  maxCombo: number;
  wordsDestroyed: number;
  accuracy: number;
  wpm: number;
  missedWords: HanziWord[];
  destroyedWords: HanziWord[];
  onRestart: () => void;
  onReturnToMenu: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  level,
  maxCombo,
  wordsDestroyed,
  accuracy,
  wpm,
  missedWords,
  destroyedWords,
  onRestart,
  onReturnToMenu,
}) => {
  return (
    <div id="game-over-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
      <div id="game-over-modal-box" className="relative w-full max-w-xl bg-slate-900 border border-rose-600/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 text-center border-b border-slate-800 bg-gradient-to-b from-rose-950/40 to-slate-900">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-rose-950/80 border border-rose-500 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide">
            BASE COMPROMISED
          </h2>
          <p className="text-sm text-rose-400 font-mono">
            Defense Shields Depleted at Level {level}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Final Score</div>
              <div className="text-lg font-black text-sky-400">{score.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Destroyed</div>
              <div className="text-lg font-black text-emerald-400">{wordsDestroyed}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Max Combo</div>
              <div className="text-lg font-black text-orange-400 flex items-center justify-center gap-0.5">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>{maxCombo}x</span>
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Typing Speed</div>
              <div className="text-lg font-black text-purple-400">{wpm} WPM</div>
            </div>
          </div>

          {/* Words to Review (Missed / Hit base) */}
          {missedWords.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Words That Breached Your Base ({missedWords.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-rose-900/30">
                {missedWords.map((w, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-rose-950/20 border border-rose-800/40"
                  >
                    <div>
                      <div className="text-base font-bold text-white">{w.hanzi}</div>
                      <div className="text-xs font-mono text-rose-300 font-semibold">{w.pinyin}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[130px]">{w.english}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakChinese(w.hanzi)}
                      className="p-1.5 rounded bg-rose-900/40 hover:bg-rose-900 text-rose-200 transition"
                      title="Pronounce"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destroyed Words Review */}
          {destroyedWords.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Successfully Destroyed Words ({destroyedWords.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                {destroyedWords.slice(-20).map((w, idx) => (
                  <span
                    key={idx}
                    onClick={() => speakChinese(w.hanzi)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:border-emerald-400 hover:text-emerald-300 cursor-pointer transition"
                    title={`Click to pronounce: ${w.pinyin} (${w.english})`}
                  >
                    <span>{w.hanzi}</span>
                    <Volume2 className="w-3 h-3 text-slate-500" />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            type="button"
            onClick={onReturnToMenu}
            className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1.5 transition"
          >
            <Home className="w-4 h-4" />
            <span>Main Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
