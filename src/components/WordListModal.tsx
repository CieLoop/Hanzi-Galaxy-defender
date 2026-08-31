import React, { useState, useRef } from 'react';
import { WordListPreset, HanziWord } from '../types';
import { PRESET_WORD_PACKS } from '../data/hskData';
import { parseTxtWordList, getSampleTxtTemplate } from '../utils/txtParser';
import { speakChinese } from '../utils/pinyin';
import { X, Upload, FileText, Download, Check, Volume2, Plus, Trash2, BookOpen } from 'lucide-react';

interface WordListModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPackId: string;
  customPacks: WordListPreset[];
  onSelectPack: (pack: WordListPreset) => void;
  onSaveCustomPack: (pack: WordListPreset) => void;
  onDeleteCustomPack: (packId: string) => void;
}

export const WordListModal: React.FC<WordListModalProps> = ({
  isOpen,
  onClose,
  currentPackId,
  customPacks,
  onSelectPack,
  onSaveCustomPack,
  onDeleteCustomPack,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'import' | 'custom'>('presets');
  const [pastedText, setPastedText] = useState('');
  const [customListName, setCustomListName] = useState('');
  const [parsedPreview, setParsedPreview] = useState<HanziWord[]>([]);
  const [importError, setImportError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const allPacks = [...PRESET_WORD_PACKS, ...customPacks];

  // Handle TXT File reading
  const handleFileUpload = (file: File) => {
    setImportError(null);
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.csv')) {
      setImportError('Please upload a valid .txt or .csv text file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const listName = file.name.replace(/\.[^/.]+$/, '');
      const parsed = parseTxtWordList(content, listName);
      if (parsed.length === 0) {
        setImportError('No valid Chinese words found in file. Make sure lines contain Hanzi characters.');
      } else {
        setParsedPreview(parsed);
        setPastedText(content);
        if (!customListName) {
          setCustomListName(listName);
        }
      }
    };
    reader.onerror = () => {
      setImportError('Failed to read file.');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleParseText = () => {
    setImportError(null);
    const name = customListName.trim() || 'Custom Vocabulary';
    const parsed = parseTxtWordList(pastedText, name);
    if (parsed.length === 0) {
      setImportError('No valid Chinese words found in text.');
      return;
    }
    setParsedPreview(parsed);
  };

  const handleSaveAndUse = () => {
    if (parsedPreview.length === 0) {
      setImportError('Please parse or upload valid words first.');
      return;
    }

    const name = customListName.trim() || `Custom List (${parsedPreview.length} words)`;
    const newPack: WordListPreset = {
      id: `custom-pack-${Date.now()}`,
      name,
      description: `Custom word list containing ${parsedPreview.length} Hanzi words.`,
      category: 'Custom',
      words: parsedPreview,
      isCustom: true,
    };

    onSaveCustomPack(newPack);
    onSelectPack(newPack);
    onClose();
  };

  const handleDownloadSample = () => {
    const template = getSampleTxtTemplate();
    const blob = new Blob([template], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hanzi-words-sample.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="word-list-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div id="word-list-modal-box" className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">Vocabulary & TXT Word Lists</h2>
          </div>
          <button
            id="close-word-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'presets'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Preset Word Packs ({PRESET_WORD_PACKS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'import'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload TXT List</span>
          </button>
          {customPacks.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition ${
                activeTab === 'custom'
                  ? 'border-sky-500 text-sky-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              My Saved Lists ({customPacks.length})
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRESET_WORD_PACKS.map((pack) => {
                const isSelected = pack.id === currentPackId;
                return (
                  <div
                    key={pack.id}
                    className={`relative p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-500 ring-1 ring-sky-500/50 shadow-lg shadow-sky-950'
                        : 'bg-slate-800/60 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                    onClick={() => {
                      onSelectPack(pack);
                      onClose();
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-400 border border-slate-700">
                          {pack.category} • {pack.words.length} words
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-xs font-bold text-sky-400">
                            <Check className="w-4 h-4" /> Active
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">{pack.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{pack.description}</p>
                    </div>

                    {/* Word Sample Preview */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-700/50">
                      {pack.words.slice(0, 6).map((w, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 rounded bg-slate-900/80 text-slate-300">
                          {w.hanzi} ({w.pinyinClean})
                        </span>
                      ))}
                      {pack.words.length > 6 && (
                        <span className="text-xs px-1.5 py-0.5 text-slate-500">
                          +{pack.words.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: IMPORT TXT */}
          {activeTab === 'import' && (
            <div className="space-y-5">
              {/* Drag & Drop Box */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                  isDragging
                    ? 'border-sky-400 bg-sky-950/30'
                    : 'border-slate-700 hover:border-sky-500 bg-slate-950/40 hover:bg-slate-900/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.csv"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-sky-950/60 border border-sky-500/40 rounded-full text-sky-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Drop your <span className="text-sky-400">.txt</span> word list file here or click to browse
                  </div>
                  <div className="text-xs text-slate-400">
                    Supports lines like: <code className="text-sky-300 font-mono">你好, ni hao, hello</code> or plain Hanzi list
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sample .TXT Template</span>
                </button>
              </div>

              {/* Paste / Direct Input Box */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  Or Paste Raw Text / Word List
                </label>
                <textarea
                  id="txt-paste-textarea"
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder={`Example:\n你好, nǐ hǎo, hello\n朋友, péng you, friend\n宇宙, yǔ zhòu, universe\n或直接粘贴任何汉字文章...`}
                  rows={5}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Custom List Name & Parse */}
              <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
                <div className="flex-1 w-full">
                  <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider block mb-1">
                    Custom List Name
                  </label>
                  <input
                    type="text"
                    value={customListName}
                    onChange={(e) => setCustomListName(e.target.value)}
                    placeholder="e.g. My HSK 4 Favorites, Chapter 3 Words"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleParseText}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg text-sm font-semibold transition"
                >
                  Parse Words
                </button>
              </div>

              {importError && (
                <div className="p-3 bg-rose-950/50 border border-rose-600/60 rounded-xl text-rose-300 text-xs">
                  {importError}
                </div>
              )}

              {/* Preview parsed words */}
              {parsedPreview.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">
                      Parsed Words ({parsedPreview.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleSaveAndUse}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold rounded-lg text-xs tracking-wider uppercase shadow-lg shadow-sky-600/30 transition"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save & Play With This List</span>
                    </button>
                  </div>

                  <div className="max-h-48 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800">
                    {parsedPreview.map((w, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800"
                      >
                        <div>
                          <div className="text-sm font-bold text-white">{w.hanzi}</div>
                          <div className="text-xs font-mono text-sky-400">{w.pinyin}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{w.english}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => speakChinese(w.hanzi)}
                          className="p-1 rounded text-slate-400 hover:text-sky-300 hover:bg-slate-800"
                          title="Pronounce"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM SAVED LISTS */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
              {customPacks.map((pack) => {
                const isSelected = pack.id === currentPackId;
                return (
                  <div
                    key={pack.id}
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-500'
                        : 'bg-slate-800/60 border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-white">{pack.name}</h4>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-sky-400 font-mono">
                          {pack.words.length} words
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{pack.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectPack(pack);
                          onClose();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          isSelected
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-700 hover:bg-sky-600 text-slate-200'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteCustomPack(pack.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-400 hover:bg-rose-900/60 transition"
                        title="Delete custom list"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
