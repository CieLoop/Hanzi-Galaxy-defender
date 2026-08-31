/**
 * Pinyin normalization and comparison utilities
 */

const TONE_MAP: Record<string, string> = {
  'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
  'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
  'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
  'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
  'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
  'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v', 'ü': 'v',
  'Ā': 'A', 'Á': 'A', 'Ǎ': 'A', 'À': 'A',
  'Ē': 'E', 'É': 'E', 'Ě': 'E', 'È': 'E',
  'Ī': 'I', 'Í': 'I', 'Ǐ': 'I', 'Ì': 'I',
  'Ō': 'O', 'Ó': 'O', 'Ǒ': 'O', 'Ò': 'O',
  'Ū': 'U', 'Ú': 'U', 'Ǔ': 'U', 'Ù': 'U',
  'Ǖ': 'V', 'Ǘ': 'V', 'Ǚ': 'V', 'Ǜ': 'V', 'Ü': 'V',
};

/**
 * Strips tone marks and converts ü/ǖ to v, removes extra spaces and punctuation
 * e.g. "nǐ hǎo" -> "nihao"
 */
export function cleanPinyin(pinyin: string): string {
  if (!pinyin) return '';
  let clean = '';
  for (const char of pinyin) {
    clean += TONE_MAP[char] || char;
  }
  // Remove numbers (like tone numbers 1-5), spaces, apostrophes, and punctuation
  return clean
    .toLowerCase()
    .replace(/[0-9\s\-',.!?:;，。]/g, '')
    .trim();
}

/**
 * Returns spaced pinyin with tones stripped
 * e.g. "nǐ hǎo" -> "ni hao"
 */
export function cleanPinyinWithSpaces(pinyin: string): string {
  if (!pinyin) return '';
  let clean = '';
  for (const char of pinyin) {
    clean += TONE_MAP[char] || char;
  }
  return clean
    .toLowerCase()
    .replace(/[0-9\-',.!?:;，。]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks whether user input matches a target word's pinyin
 * User might input:
 * 1. "nihao"
 * 2. "ni hao"
 * 3. "ni3hao3"
 * 4. "ni3 hao3"
 * 5. "nǐhǎo"
 */
export function isPinyinMatch(input: string, wordPinyin: string, cleanTarget: string): boolean {
  const normalizedInput = cleanPinyin(input);
  if (!normalizedInput || !cleanTarget) return false;

  if (normalizedInput === cleanTarget) {
    return true;
  }

  // Also check if input stripped of everything equals cleanTarget
  const strippedWordPinyin = cleanPinyin(wordPinyin);
  if (normalizedInput === strippedWordPinyin) {
    return true;
  }

  return false;
}

/**
 * Checks how much of the target word's pinyin matches the prefix of user's input
 * Returns the matching character count or 0
 */
export function getPinyinMatchPrefixLength(input: string, cleanTarget: string): number {
  const normalizedInput = cleanPinyin(input);
  if (!normalizedInput || !cleanTarget) return 0;

  if (cleanTarget.startsWith(normalizedInput)) {
    return normalizedInput.length;
  }

  return 0;
}

/**
 * Text-to-speech for Chinese pronunciation
 */
export function speakChinese(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    
    // Attempt to pick a zh-CN voice if available
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('cmn'));
    if (zhVoice) {
      utterance.voice = zhVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
  }
}
