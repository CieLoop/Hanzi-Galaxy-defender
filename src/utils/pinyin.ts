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
 * Strips tone marks and converts tone accents, removes extra spaces and punctuation.
 * e.g. "nǐ hǎo" -> "nihao", "lǚ yóu" -> "lvyou"
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
 * Checks whether user input matches a target word's pinyin.
 * Supports:
 * - Direct match: "nihao" matches "nihao"
 * - Umlaut flexibility: both 'v' and 'u' match 'ü' (e.g. "lvyou" OR "luyou" for "lǚ yóu", "nver" OR "nuer" for "女儿")
 * - Tone numbers / spaces stripped gracefully (e.g. "ni3 hao3")
 */
export function isPinyinMatch(input: string, wordPinyin: string, cleanTarget?: string): boolean {
  const normalizedInput = cleanPinyin(input);
  if (!normalizedInput) return false;

  const targetClean = cleanTarget ? cleanPinyin(cleanTarget) : cleanPinyin(wordPinyin);
  const targetOrig = cleanPinyin(wordPinyin);

  // 1. Direct equality
  if (normalizedInput === targetClean || normalizedInput === targetOrig) {
    return true;
  }

  // 2. Flexible 'u' and 'v' equivalence (ü can be typed as either 'v' or 'u')
  const inputNormU = normalizedInput.replace(/v/g, 'u');
  const targetCleanNormU = targetClean.replace(/v/g, 'u');
  const targetOrigNormU = targetOrig.replace(/v/g, 'u');

  if (inputNormU === targetCleanNormU || inputNormU === targetOrigNormU) {
    return true;
  }

  const inputNormV = normalizedInput.replace(/u/g, 'v');
  const targetCleanNormV = targetClean.replace(/u/g, 'v');
  const targetOrigNormV = targetOrig.replace(/u/g, 'v');

  if (inputNormV === targetCleanNormV || inputNormV === targetOrigNormV) {
    return true;
  }

  return false;
}

/**
 * Checks whether user input matches the prefix of a target word's pinyin.
 * Supports typing either 'u' or 'v' for umlaut characters.
 */
export function isPinyinPrefixMatch(input: string, cleanTarget: string, wordPinyin?: string): boolean {
  const normalizedInput = cleanPinyin(input);
  if (!normalizedInput || !cleanTarget) return false;

  const targetClean = cleanPinyin(cleanTarget);
  const targetOrig = wordPinyin ? cleanPinyin(wordPinyin) : '';

  // Direct prefix
  if (targetClean.startsWith(normalizedInput) || (targetOrig && targetOrig.startsWith(normalizedInput))) {
    return true;
  }

  // Flexible 'u' and 'v' prefix matching (e.g. typing 'lu' or 'lv' for 'lvyou')
  const inputNormU = normalizedInput.replace(/v/g, 'u');
  const targetNormU = targetClean.replace(/v/g, 'u');
  if (targetNormU.startsWith(inputNormU)) {
    return true;
  }

  const inputNormV = normalizedInput.replace(/u/g, 'v');
  const targetNormV = targetClean.replace(/u/g, 'v');
  if (targetNormV.startsWith(inputNormV)) {
    return true;
  }

  if (targetOrig) {
    const origNormU = targetOrig.replace(/v/g, 'u');
    if (origNormU.startsWith(inputNormU)) return true;
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

  if (isPinyinPrefixMatch(input, cleanTarget)) {
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
