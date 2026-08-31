import React from 'react';
import { GameSettings } from '../types';
import { X, Volume2, VolumeX, Eye, Sparkles, Sliders, Radio, Music } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (s: Partial<GameSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div id="settings-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div id="settings-modal-box" className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">Game Settings</h2>
          </div>
          <button
            id="close-settings-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Base Speed Preset */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider flex items-center justify-between">
              <span>Base Game Speed</span>
              <span className="text-sky-400 font-mono">{settings.baseSpeedMultiplier.toFixed(1)}x</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '0.8x Relaxed', val: 0.8 },
                { label: '1.0x Normal', val: 1.0 },
                { label: '1.3x Swift', val: 1.3 },
                { label: '1.6x Hyper', val: 1.6 },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => onUpdateSettings({ baseSpeedMultiplier: item.val })}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border transition text-center ${
                    settings.baseSpeedMultiplier === item.val
                      ? 'bg-sky-600 border-sky-400 text-white shadow-md shadow-sky-600/30'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sound & Audio */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Audio & Synth</h3>

            {/* Sound FX Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-sky-400">
                  {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Laser & Explosions SFX</div>
                  <div className="text-xs text-slate-400">Sound effects when typing & destroying words</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => {
                  onUpdateSettings({ soundEnabled: e.target.checked });
                  sounds.setSoundEnabled(e.target.checked);
                }}
                className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
              />
            </div>

            {/* Space Synth Ambient Music */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-purple-400">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Ambient Space Synth</div>
                  <div className="text-xs text-slate-400">Atmospheric procedural galaxy synth drone</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.musicEnabled}
                onChange={(e) => {
                  onUpdateSettings({ musicEnabled: e.target.checked });
                  sounds.setMusicEnabled(e.target.checked);
                }}
                className="w-5 h-5 accent-purple-500 rounded cursor-pointer"
              />
            </div>

            {/* Text-to-speech Pronunciation On Hit */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Voice Pronunciation On Hit</div>
                  <div className="text-xs text-slate-400">Speaks Chinese pronunciation upon laser blast</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.speakOnHit}
                onChange={(e) => onUpdateSettings({ speakOnHit: e.target.checked })}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Gameplay & Visual Hints */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Visual Assists</h3>

            {/* Pinyin Hint */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-sky-400">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Show Pinyin Hint</div>
                  <div className="text-xs text-slate-400">Turn off for hardcore pure Hanzi recognition</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.showPinyinHint}
                onChange={(e) => onUpdateSettings({ showPinyinHint: e.target.checked })}
                className="w-5 h-5 accent-sky-500 rounded cursor-pointer"
              />
            </div>

            {/* English Meaning */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Show English Meaning</div>
                  <div className="text-xs text-slate-400">Display English translation beneath falling words</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.showEnglishHint}
                onChange={(e) => onUpdateSettings({ showEnglishHint: e.target.checked })}
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm transition"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
