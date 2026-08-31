import React, { useRef, useEffect } from 'react';
import { ActiveProjectile } from '../types';
import { Volume2, CornerDownLeft, Delete, Target, Sparkles } from 'lucide-react';
import { speakChinese } from '../utils/pinyin';

interface TypingInputProps {
  currentInput: string;
  onInputChange: (val: string) => void;
  onSubmit: () => void;
  targetedProjectile: ActiveProjectile | null;
  autoFocus: boolean;
  disabled?: boolean;
  showEnglishHint?: boolean;
}

export const TypingInput: React.FC<TypingInputProps> = ({
  currentInput,
  onInputChange,
  onSubmit,
  targetedProjectile,
  autoFocus,
  disabled = false,
  showEnglishHint = true,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keep focus locked for fast, continuous typing experience
  useEffect(() => {
    if (autoFocus && !disabled) {
      inputRef.current?.focus();
    }
  }, [autoFocus, disabled]);

  // Global key listener to refocus if clicked outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (document.activeElement !== inputRef.current && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    } else if (e.key === 'Escape') {
      onInputChange('');
    }
  };

  const handleVirtualKey = (char: string) => {
    onInputChange(currentInput + char);
    inputRef.current?.focus();
  };

  const handleBackspace = () => {
    onInputChange(currentInput.slice(0, -1));
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onInputChange('');
    inputRef.current?.focus();
  };

  return (
    <div id="typing-hud-container" className="w-full max-w-2xl mx-auto px-4 z-20">
      {/* Target Lock Banner */}
      {targetedProjectile && (
        <div
          id="target-lock-hud"
          className="mb-2 flex items-center justify-between bg-slate-900/90 border border-sky-500/50 rounded-lg px-4 py-2 text-white shadow-lg shadow-sky-500/10 backdrop-blur-md animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-sky-400 uppercase">
              <Target className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>Target Locked</span>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <span className="text-2xl font-black text-sky-200 tracking-wider">
              {targetedProjectile.word.hanzi}
            </span>
            {showEnglishHint && targetedProjectile.word.english && (
              <span className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                {targetedProjectile.word.english}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-sky-400 hidden sm:inline">
              Recall & Type Pinyin
            </span>
          </div>
        </div>
      )}

      {/* Main Command Input Box */}
      <div className="relative">
        <div className="relative flex items-center bg-slate-950 border border-slate-700 focus-within:border-sky-400 rounded-xl px-4 py-3 shadow-2xl">
          {/* Cyber reticle icon */}
          <div className="mr-3 text-sky-400">
            <Sparkles className="w-5 h-5" />
          </div>

          {/* Actual Hidden/Visible Input Field */}
          <input
            id="galaxy-pinyin-input"
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={targetedProjectile ? `Type pinyin for "${targetedProjectile.word.hanzi}"...` : 'Type Pinyin to fire laser...'}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className="w-full bg-transparent text-lg md:text-xl font-mono text-white placeholder:text-slate-500 focus:outline-none tracking-wider"
          />

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 ml-2">
            {currentInput && (
              <button
                id="clear-input-btn"
                type="button"
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded transition-colors"
                title="Clear input"
              >
                <Delete className="w-4 h-4" />
              </button>
            )}

            <button
              id="fire-laser-btn"
              type="button"
              onClick={onSubmit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md shadow-sky-600/30 transition active:scale-95"
            >
              <span>Fire</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Touch keyboard for mobile screens */}
      <div className="mt-2 flex flex-wrap justify-center gap-1 sm:hidden">
        {['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handleVirtualKey(key)}
            className="w-7 h-8 bg-slate-800/80 active:bg-sky-600 text-white text-xs font-mono font-bold rounded flex items-center justify-center border border-slate-700 active:scale-90 transition"
          >
            {key}
          </button>
        ))}
        <button
          type="button"
          onClick={handleBackspace}
          className="px-2 h-8 bg-slate-800/80 text-rose-300 text-xs font-mono rounded flex items-center justify-center border border-slate-700"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};
