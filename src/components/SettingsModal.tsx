import React, { useState } from 'react';
import { GameSettings } from '../types';
import { X, Volume2, VolumeX, Eye, Sparkles, Sliders, Radio, Music, Lock, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
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
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePinyinToggleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const willEnable = e.target.checked;
    if (willEnable) {
      // Prompt for password
      setShowPasscodeModal(true);
      setPasscodeInput('');
      setPasscodeError(null);
      setPasscodeSuccess(false);
    } else {
      // Turning off requires no password
      onUpdateSettings({ showPinyinHint: false });
    }
  };

  const handleVerifyPasscode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = passcodeInput.trim().toLowerCase();
    const stripped = cleanInput.replace(/[\/\-\.\s]/g, '');

    // Accepts 13/12/2007 or variants like 13-12-2007, 13122007, 13.12.2007
    if (cleanInput === '13/12/2007' || stripped === '13122007') {
      setPasscodeSuccess(true);
      setPasscodeError(null);
      setTimeout(() => {
        onUpdateSettings({ showPinyinHint: true });
        setShowPasscodeModal(false);
        setPasscodeSuccess(false);
        setPasscodeInput('');
      }, 400);
    } else {
      setPasscodeError('Incorrect passcode. Hint: Special date (format: dd/mm/yyyy)');
    }
  };

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
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Show Pinyin Hint</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
                      <Lock className="w-2.5 h-2.5" /> Passcode
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">Display pinyin directly above incoming Hanzi</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.showPinyinHint}
                onChange={handlePinyinToggleClick}
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

        {/* Passcode Unlock Modal Overlay */}
        {showPasscodeModal && (
          <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md flex flex-col justify-center p-6 animate-fadeIn">
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                <KeyRound className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Enter Passcode</h3>
                <p className="text-xs text-slate-400 mt-1">
                  To turn on Pinyin hints, enter the <span className="text-amber-300 font-semibold">special date</span>.
                </p>
                <div className="text-[11px] font-mono text-sky-400 mt-0.5">
                  Hint: dd/mm/yyyy
                </div>
              </div>

              <form onSubmit={handleVerifyPasscode} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      if (passcodeError) setPasscodeError(null);
                    }}
                    placeholder="dd/mm/yyyy"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-center font-mono text-sm tracking-wider text-white placeholder:text-slate-600 focus:outline-none transition ${
                      passcodeError
                        ? 'border-red-500/80 focus:border-red-500 bg-red-950/10'
                        : passcodeSuccess
                        ? 'border-emerald-500/80 focus:border-emerald-500 bg-emerald-950/10'
                        : 'border-slate-700 focus:border-sky-500'
                    }`}
                  />
                </div>

                {passcodeError && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{passcodeError}</span>
                  </div>
                )}

                {passcodeSuccess && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Passcode verified! Pinyin hint unlocked.</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasscodeModal(false);
                      setPasscodeInput('');
                      setPasscodeError(null);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-md shadow-sky-600/30"
                  >
                    Unlock & Enable
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

