import React from 'react';
import { GameMode, WordListPreset } from '../types';
import { PRESET_WORD_PACKS } from '../data/hskData';
import { Play, Sparkles, BookOpen, Settings, Trophy, Shield, Zap, Target, Volume2, Upload } from 'lucide-react';

interface StartScreenProps {
  onStartGame: (mode: GameMode) => void;
  selectedPack: WordListPreset;
  onOpenWordListModal: () => void;
  onOpenSettingsModal: () => void;
  highScore: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  selectedPack,
  onOpenWordListModal,
  onOpenSettingsModal,
  highScore,
}) => {
  return (
    <div id="galaxy-start-screen" className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 select-none overflow-hidden bg-slate-950">
      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-sky-500/40 text-sky-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sci-Fi Pinyin Typing Arcade</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
          HANZI GALAXY DEFENDER
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mb-6 leading-relaxed">
          Defend your space base from falling Hanzi meteors by typing their Pinyin. Each level escalates falling speeds!
        </p>

        {/* High Score Banner */}
        {highScore > 0 && (
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-amber-950 border border-amber-500/40 rounded-full text-amber-300 text-xs font-mono">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>PERSONAL HIGH SCORE: <strong className="text-amber-200">{highScore.toLocaleString()}</strong></span>
          </div>
        )}

        {/* Active Word Pack Selector Card */}
        <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6 text-left flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Active Vocabulary List</span>
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              {selectedPack.name}
            </div>
            <div className="text-xs text-slate-400 truncate max-w-[280px]">
              {selectedPack.words.length} words • {selectedPack.category}
            </div>
          </div>

          <button
            id="change-word-list-btn"
            type="button"
            onClick={onOpenWordListModal}
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-sky-500 text-sky-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Change / Upload TXT</span>
          </button>
        </div>

        {/* Game Mode Buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Campaign Mode */}
          <button
            id="start-campaign-mode-btn"
            type="button"
            onClick={() => onStartGame('campaign')}
            className="group relative p-4 bg-sky-600 hover:bg-sky-500 rounded-2xl text-left shadow-lg transition active:scale-98 flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-sky-100">Recommended</span>
              <div className="p-1.5 rounded-full bg-sky-700 text-white group-hover:translate-x-1 transition">
                <Play className="w-4 h-4 fill-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Campaign Defense</h3>
              <p className="text-xs text-sky-100 mt-1">10 escalating levels with speed boosts, multi-word waves & bosses.</p>
            </div>
          </button>

          {/* Endless Survival Mode */}
          <button
            id="start-endless-mode-btn"
            type="button"
            onClick={() => onStartGame('endless')}
            className="group relative p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-2xl text-left shadow-md transition active:scale-98 flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-400">High Score</span>
              <div className="p-1.5 rounded-full bg-slate-900 text-purple-300 group-hover:translate-x-1 transition">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Endless Survival</h3>
              <p className="text-xs text-slate-300 mt-1">Nonstop incoming meteors with continuously accelerating velocity.</p>
            </div>
          </button>
        </div>

        {/* How to Play Quick Cards */}
        <div className="w-full grid grid-cols-3 gap-2 text-left mb-6 pt-4 border-t border-slate-800">
          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-sky-400 mb-1">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-200">1. Spot Hanzi</div>
            <div className="text-[10px] text-slate-400">Characters fall from the galaxy top</div>
          </div>
          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-emerald-400 mb-1">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-200">2. Type Pinyin</div>
            <div className="text-[10px] text-slate-400">e.g. type "nihao" or "xiexie"</div>
          </div>
          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-purple-400 mb-1">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-200">3. Fire & Defend</div>
            <div className="text-[10px] text-slate-400">Laser destroys meteor before base hit</div>
          </div>
        </div>

        {/* Settings button */}
        <div className="flex items-center justify-center">
          <button
            id="start-settings-btn"
            type="button"
            onClick={onOpenSettingsModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings & Sound Options</span>
          </button>
        </div>
      </div>
    </div>
  );
};
