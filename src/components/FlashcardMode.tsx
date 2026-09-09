import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WordListPreset, HanziWord } from '../types';
import { PRESET_WORD_PACKS } from '../data/hskData';
import { getExampleSentence } from '../data/hskSentences';
import { speakChinese } from '../utils/pinyin';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Shuffle,
  Volume2,
  CheckCircle2,
  BookmarkPlus,
  BookOpen,
  ChevronDown,
  X,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface FlashcardModeProps {
  selectedPack: WordListPreset;
  customPacks: WordListPreset[];
  onSelectPack: (pack: WordListPreset) => void;
  onExit: () => void;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({
  selectedPack,
  customPacks,
  onSelectPack,
  onExit,
}) => {
  const allPacks = useMemo(() => [...PRESET_WORD_PACKS, ...customPacks], [customPacks]);
  
  // Flashcard Deck State
  const [isShuffled, setIsShuffled] = useState(false);
  const [deck, setDeck] = useState<HanziWord[]>(selectedPack.words);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPackMenuOpen, setIsPackMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Mastery session tracking (Word IDs marked as mastered)
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Re-sync deck when selectedPack changes or shuffle toggled
  useEffect(() => {
    let words = [...selectedPack.words];
    if (isShuffled) {
      words = words.sort(() => Math.random() - 0.5);
    }
    setDeck(words);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedPack, isShuffled]);

  const currentWord: HanziWord | undefined = deck[currentIndex];
  const sentence = currentWord ? getExampleSentence(currentWord) : null;
  const isMastered = currentWord ? masteredIds.has(currentWord.id) : false;

  const handleNext = useCallback(() => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  }, [deck.length]);

  const handlePrev = useCallback(() => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  }, [deck.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handlePlayAudio = useCallback((text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsSpeaking(true);
    speakChinese(text);
    setTimeout(() => setIsSpeaking(false), 900);
  }, []);

  const handleToggleMastery = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentWord) return;
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentWord.id)) {
        next.delete(currentWord.id);
      } else {
        next.add(currentWord.id);
      }
      return next;
    });
  }, [currentWord]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modifier keys pressed or typing in inputs
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        if (currentWord) {
          handlePlayAudio(isFlipped && sentence ? sentence.hanzi : currentWord.hanzi);
        }
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMastery();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handlePlayAudio, handleToggleMastery, currentWord, isFlipped, sentence, onExit]);

  // Progress percentage
  const progressPercent = deck.length > 0 ? Math.round(((currentIndex + 1) / deck.length) * 100) : 0;
  const masteredPercent = deck.length > 0 ? Math.round((masteredIds.size / deck.length) * 100) : 0;

  // Level color styling helper
  const getLevelColor = (level?: number) => {
    switch (level) {
      case 1:
        return 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40';
      case 2:
        return 'border-sky-500/40 text-sky-400 bg-sky-950/40';
      case 3:
        return 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40';
      case 4:
        return 'border-amber-500/40 text-amber-400 bg-amber-950/40';
      case 5:
        return 'border-orange-500/40 text-orange-400 bg-orange-950/40';
      case 6:
        return 'border-purple-500/40 text-purple-400 bg-purple-950/40';
      case 7:
        return 'border-rose-500/40 text-rose-400 bg-rose-950/40';
      default:
        return 'border-slate-500/40 text-slate-300 bg-slate-800/40';
    }
  };

  return (
    <div id="flashcard-mode-container" className="relative min-h-[100dvh] w-full flex flex-col bg-slate-950 text-slate-100 select-none overflow-x-hidden overflow-y-auto pb-24 sm:pb-28">
      {/* Background Starfield Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 py-4 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Main Menu</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FLASHCARD STUDY LAB</span>
          </div>
        </div>

        {/* Word Pack Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsPackMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span className="truncate max-w-[160px] sm:max-w-[220px]">{selectedPack.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isPackMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsPackMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-40 max-h-96 overflow-y-auto animate-fadeIn">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-3 py-1.5">
                  Select HSK Word Pack
                </div>
                {allPacks.map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => {
                      onSelectPack(pack);
                      setIsPackMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition cursor-pointer ${
                      selectedPack.id === pack.id
                        ? 'bg-sky-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <div>{pack.name}</div>
                      <div className={`text-[10px] ${selectedPack.id === pack.id ? 'text-sky-200' : 'text-slate-500'}`}>
                        {pack.words.length} words
                      </div>
                    </div>
                    {selectedPack.id === pack.id && (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Progress & Deck Stats Bar */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 mt-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
          <div className="flex items-center gap-2">
            <span>Card <strong className="text-white font-bold">{currentIndex + 1}</strong> of {deck.length}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold">{masteredIds.size} Mastered</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsShuffled((prev) => !prev)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[11px] font-semibold transition cursor-pointer ${
                isShuffled
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle random shuffle order"
            >
              <Shuffle className="w-3 h-3" />
              <span>{isShuffled ? 'Shuffled' : 'Sequential'}</span>
            </button>
          </div>
        </div>

        {/* Dual Progress Bar: Progress & Mastered */}
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
          <div
            className="h-full bg-sky-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Flashcard Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 max-w-xl w-full mx-auto">
        {currentWord ? (
          <div className="w-full">
            {/* 3D Flip Card Container */}
            <div
              id="active-flashcard"
              onClick={handleFlip}
              className="relative w-full min-h-[380px] sm:min-h-[420px] rounded-3xl cursor-pointer select-none transition-transform duration-500 shadow-2xl [perspective:1200px]"
            >
              <div
                className={`relative w-full h-full min-h-[380px] sm:min-h-[420px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 [transform-style:preserve-3d] border ${
                  isFlipped
                    ? 'bg-slate-900/95 border-amber-500/40 shadow-amber-950/20'
                    : 'bg-slate-900/95 border-sky-500/30 hover:border-sky-500/60 shadow-sky-950/20'
                } backdrop-blur-xl`}
              >
                {/* CARD FRONT: Hanzi + Pinyin */}
                {!isFlipped ? (
                  <div className="flex-1 flex flex-col justify-between items-center text-center animate-fadeIn">
                    {/* Top Badges */}
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {currentWord.hskLevel && (
                          <span
                            className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold tracking-wide ${getLevelColor(
                              currentWord.hskLevel
                            )}`}
                          >
                            HSK {currentWord.hskLevel}
                          </span>
                        )}
                        {currentWord.category && (
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px]">
                            {currentWord.category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(currentWord.hanzi, e)}
                          className="p-2 rounded-xl bg-slate-800/80 hover:bg-sky-600/30 border border-slate-700 text-sky-400 hover:text-white transition cursor-pointer"
                          title="Listen to Chinese pronunciation (Key: P)"
                        >
                          <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-sky-300' : ''}`} />
                        </button>
                        <button
                          type="button"
                          onClick={handleToggleMastery}
                          className={`p-2 rounded-xl border transition cursor-pointer ${
                            isMastered
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                          title="Mark as learned (Key: M)"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Center: Large Hanzi & Tone Pinyin */}
                    <div className="my-auto py-6 flex flex-col items-center">
                      <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-wider mb-4 drop-shadow-md">
                        {currentWord.hanzi}
                      </div>
                      <div className="text-2xl sm:text-3xl font-mono font-semibold text-sky-400 tracking-wide">
                        {currentWord.pinyin}
                      </div>
                    </div>

                    {/* Bottom Flip Prompt */}
                    <div className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-4 font-medium">
                      <RotateCw className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
                      <span>Click card or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-sky-300">Space</kbd> to see English & Example</span>
                    </div>
                  </div>
                ) : (
                  /* CARD BACK: English Meaning + Example Usage in Sentence */
                  <div className="flex-1 flex flex-col justify-between text-left animate-fadeIn">
                    {/* Top Reference Bar */}
                    <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">{currentWord.hanzi}</span>
                        <span className="text-sm font-mono text-sky-400">{currentWord.pinyin}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(sentence ? sentence.hanzi : currentWord.hanzi, e)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-sky-600/30 border border-slate-700 text-sky-400 hover:text-white transition cursor-pointer"
                          title="Listen to example sentence audio (Key: P)"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleToggleMastery}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            isMastered
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                          title="Mark as learned (Key: M)"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* English Meaning Section */}
                    <div className="my-3">
                      <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                        English Meaning
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-amber-200 capitalize">
                        {currentWord.english}
                      </div>
                    </div>

                    {/* Example Usage in Sentence Section */}
                    {sentence && (
                      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 my-2 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-sky-400" />
                            <span>Example Sentence</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handlePlayAudio(sentence.hanzi, e)}
                            className="text-[11px] text-slate-400 hover:text-sky-300 flex items-center gap-1 transition"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Listen</span>
                          </button>
                        </div>

                        {/* Hanzi Sentence with target highlighted */}
                        <div className="text-base sm:text-lg font-medium text-white leading-relaxed">
                          {sentence.hanzi}
                        </div>

                        {/* Pinyin Sentence */}
                        <div className="text-xs sm:text-sm font-mono text-sky-300/90 leading-normal">
                          {sentence.pinyin}
                        </div>

                        {/* English Sentence Translation */}
                        <div className="text-xs sm:text-sm text-slate-300 leading-normal italic pt-1 border-t border-slate-800/60">
                          "{sentence.english}"
                        </div>
                      </div>
                    )}

                    {/* Bottom Flip Prompt */}
                    <div className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3 font-medium">
                      <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                      <span>Click card or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-amber-300">Space</kbd> to flip back</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between gap-3 mt-6">
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 text-sky-400" />
                <span>Prev (←)</span>
              </button>

              {/* Flip Button */}
              <button
                type="button"
                onClick={handleFlip}
                className="flex-1 py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer shadow-lg shadow-sky-600/30"
              >
                <RotateCw className="w-4 h-4" />
                <span>Flip (Space)</span>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer shadow-lg"
              >
                <span>Next (→)</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>

            {/* Quick Keyboard Reference */}
            <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400 mt-4">
              <span><kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded">Space</kbd> Flip</span>
              <span><kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded">← / →</kbd> Prev/Next</span>
              <span><kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded">P</kbd> Audio</span>
              <span><kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded">M</kbd> Mastered</span>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-slate-900 rounded-3xl border border-slate-800">
            <p className="text-slate-400">No words found in this word pack.</p>
          </div>
        )}
      </main>
    </div>
  );
};
