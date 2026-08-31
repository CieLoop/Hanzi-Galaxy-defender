/**
 * Web Speech API helper for native Chinese character audio pronunciation.
 */
let chineseVoice: SpeechSynthesisVoice | null = null;

function findChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  // Look for Mandarin zh-CN, zh-TW, or generic zh
  const zh = voices.find(v => v.lang.startsWith('zh') || v.lang === 'cmn-Hans-CN' || v.lang === 'cmn-Hant-TW');
  return zh || null;
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  chineseVoice = findChineseVoice();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      chineseVoice = findChineseVoice();
    };
  }
}

export function speakChinese(text: string, rate: number = 0.95): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    // Cancel previous utterance to avoid queue buildup
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    if (!chineseVoice) {
      chineseVoice = findChineseVoice();
    }
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis unavailable or blocked:', err);
  }
}
