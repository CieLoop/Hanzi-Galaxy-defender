import React, { useState } from 'react';
import {
  RotateCcw,
  Home,
  Volume2,
  ShieldAlert,
  Award,
  Flame,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { HanziWord } from '../types';
import { speakChinese } from '../utils/speech';

interface EndOfMatchModalProps {
  isVictory: boolean;
  score: number;
  level: number;
  levelName?: string;
  maxCombo: number;
  wordsDestroyed: number;
  accuracy: number;
  wpm: number;
  missedWords: HanziWord[];
  wrongWords: HanziWord[];
  destroyedWords: HanziWord[];
  nextSpeedMultiplier?: number;
  onRestart: () => void;
  onProceedNextLevel?: () => void;
  onReturnToMenu: () => void;
}

export const EndOfMatchModal: React.FC<EndOfMatchModalProps> = ({
  isVictory,
  score,
  level,
  levelName = `Sector ${level}`,
  maxCombo,
  wordsDestroyed,
  accuracy,
  wpm,
  missedWords,
  wrongWords,
  destroyedWords,
  nextSpeedMultiplier,
  onRestart,
  onProceedNextLevel,
  onReturnToMenu,
}) => {
  // Deduplicate words for clean lists
  const uniqueMissed: HanziWord[] = Array.from(new Map<string, HanziWord>(missedWords.map(w => [w.id + w.hanzi, w])).values());
  const uniqueWrong: HanziWord[] = Array.from(new Map<string, HanziWord>(wrongWords.map(w => [w.id + w.hanzi, w])).values());
  const uniqueDestroyed: HanziWord[] = Array.from(new Map<string, HanziWord>(destroyedWords.map(w => [w.id + w.hanzi, w])).values());

  // Default active tab to 'missed' if there are missed words, else 'wrong', else 'all'
  const [activeTab, setActiveTab] = useState<'missed' | 'wrong' | 'destroyed' | 'all'>(
    uniqueMissed.length > 0 ? 'missed' : uniqueWrong.length > 0 ? 'wrong' : 'destroyed'
  );
  const [copied, setCopied] = useState(false);
  const [playingHanzi, setPlayingHanzi] = useState<string | null>(null);

  // Audio pronounce helper
  const handlePronounce = (hanzi: string) => {
    setPlayingHanzi(hanzi);
    speakChinese(hanzi);
    setTimeout(() => setPlayingHanzi(null), 1200);
  };

  // Copy list to clipboard for study
  const handleCopyWordList = (words: HanziWord[]) => {
    const text = words.map(w => `${w.hanzi} [${w.pinyin}] - ${w.english}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Rank calculation based on accuracy and combo
  let rankBadge = 'B';
  let rankColor = 'text-sky-400 border-sky-400 bg-sky-950/60';
  if (accuracy >= 95 && maxCombo >= 10 && uniqueMissed.length === 0) {
    rankBadge = 'S+';
    rankColor = 'text-amber-300 border-amber-400 bg-amber-950/80 shadow-lg shadow-amber-500/20';
  } else if (accuracy >= 90 && uniqueMissed.length <= 1) {
    rankBadge = 'A';
    rankColor = 'text-emerald-400 border-emerald-400 bg-emerald-950/60';
  } else if (accuracy < 75 || uniqueMissed.length >= 4) {
    rankBadge = 'C';
    rankColor = 'text-rose-400 border-rose-400 bg-rose-950/60';
  }

  // Get current active display list
  let currentWords: HanziWord[] = [];
  if (activeTab === 'missed') currentWords = uniqueMissed;
  else if (activeTab === 'wrong') currentWords = uniqueWrong;
  else if (activeTab === 'destroyed') currentWords = uniqueDestroyed;
  else {
    // All words
    const allMap = new Map<string, HanziWord>();
    [...uniqueMissed, ...uniqueWrong, ...uniqueDestroyed].forEach(w => allMap.set(w.id + w.hanzi, w));
    currentWords = Array.from(allMap.values());
  }

  return (
    <div
      id="end-of-match-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-3 sm:p-5 animate-fadeIn"
    >
      <div
        id="end-of-match-modal-box"
        className={`relative w-full max-w-2xl bg-slate-900 border ${
          isVictory ? 'border-emerald-500/50 shadow-emerald-900/30' : 'border-rose-600/50 shadow-rose-900/30'
        } rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]`}
      >
        {/* Modal Header */}
        <div
          className="p-5 sm:p-6 text-center border-b border-slate-800 bg-slate-950"
        >
          <div className="flex items-center justify-between">
            {/* Sector info */}
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Tactical Debrief</span>
              <h3 className="text-sm font-bold text-slate-200">{levelName}</h3>
            </div>

            {/* Rank Badge */}
            <div className={`px-3 py-1 rounded-xl border text-base font-black tracking-wider ${rankColor}`}>
              RANK {rankBadge}
            </div>
          </div>

          <div className="mt-2">
            <div
              className={`w-14 h-14 mx-auto mb-2 rounded-full flex items-center justify-center border ${
                isVictory
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                  : 'bg-rose-950/80 border-rose-500 text-rose-400'
              }`}
            >
              {isVictory ? <Award className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              {isVictory ? 'SECTOR DEFENSE CLEARED!' : 'BASE COMPROMISED'}
            </h2>
            <p className={`text-xs font-mono font-medium ${isVictory ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isVictory ? 'All incoming Hanzi meteors neutralized' : `Defense shields depleted at Level ${level}`}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Final Score</div>
              <div className="text-lg sm:text-xl font-black text-sky-400">{score.toLocaleString()}</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Accuracy</div>
              <div className={`text-lg sm:text-xl font-black ${accuracy >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {accuracy}%
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Max Combo</div>
              <div className="text-lg sm:text-xl font-black text-orange-400 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>{maxCombo}x</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Typing Speed</div>
              <div className="text-lg sm:text-xl font-black text-purple-400">{wpm} WPM</div>
            </div>
          </div>

          {/* WORDS REVIEW & STUDY HUB */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Word Performance Review
                </h3>
              </div>

              {/* Copy words button */}
              {currentWords.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleCopyWordList(currentWords)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700"
                  title="Copy word list to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Word List'}</span>
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('missed')}
                className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'missed'
                    ? 'bg-rose-950 border border-rose-700 text-rose-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Missed ({uniqueMissed.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wrong')}
                className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'wrong'
                    ? 'bg-amber-950 border border-amber-700 text-amber-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Mistyped ({uniqueWrong.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('destroyed')}
                className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'destroyed'
                    ? 'bg-emerald-950 border border-emerald-700 text-emerald-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Defended ({uniqueDestroyed.length})</span>
              </button>
            </div>

            {/* Word List Cards Container */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-3 max-h-56 sm:max-h-64 overflow-y-auto space-y-2">
              {currentWords.length === 0 ? (
                <div className="py-8 text-center text-slate-500">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  <p className="text-xs font-medium">
                    {activeTab === 'missed'
                      ? 'Flawless defense! No words breached your base shields.'
                      : activeTab === 'wrong'
                      ? 'Clean typing! No erroneous keystrokes recorded.'
                      : 'No words in this category.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentWords.map((w, idx) => {
                    const isPlaying = playingHanzi === w.hanzi;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl border transition ${
                          activeTab === 'missed'
                            ? 'bg-rose-950/20 border-rose-800/40 hover:border-rose-600'
                            : activeTab === 'wrong'
                            ? 'bg-amber-950/20 border-amber-800/40 hover:border-amber-600'
                            : 'bg-slate-900/80 border-slate-800 hover:border-emerald-600/60'
                        }`}
                      >
                        {/* Word content */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="text-2xl font-black text-white tracking-wider font-sans">
                            {w.hanzi}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-mono font-bold text-sky-400">
                                {w.pinyin}
                              </span>
                              {w.hskLevel && (
                                <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                                  HSK {w.hskLevel}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-300 font-medium truncate max-w-[140px] sm:max-w-[160px]">
                              {w.english}
                            </div>
                          </div>
                        </div>

                        {/* Pronounce Audio Button */}
                        <button
                          type="button"
                          onClick={() => handlePronounce(w.hanzi)}
                          className={`p-2 rounded-lg transition active:scale-90 flex-shrink-0 ${
                            isPlaying
                              ? 'bg-sky-500 text-white animate-pulse'
                              : 'bg-slate-800 hover:bg-sky-900/60 text-slate-300 hover:text-sky-300 border border-slate-700'
                          }`}
                          title={`Listen to pronunciation for ${w.hanzi}`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center font-mono">
              💡 Tap the speaker icon on any word to hear standard Mandarin pronunciation.
            </p>
          </div>
        </div>

        {/* Modal Action Controls Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
          {isVictory && onProceedNextLevel && (
            <button
              type="button"
              onClick={onProceedNextLevel}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <span>Next Sector (Level {level + 1})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isVictory ? 'Replay Sector' : 'Try Again'}</span>
          </button>

          <button
            type="button"
            onClick={onReturnToMenu}
            className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Main Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
