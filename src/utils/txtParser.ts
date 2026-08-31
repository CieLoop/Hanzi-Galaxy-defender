import { HanziWord } from '../types';
import { cleanPinyin, cleanPinyinWithSpaces } from './pinyin';
import { HANZI_LOOKUP_MAP, CHAR_PINYIN_MAP } from '../data/hskData';

/**
 * Parses user-provided TXT content into structured HanziWord items.
 */
export function parseTxtWordList(content: string, listName: string = 'Custom List'): HanziWord[] {
  if (!content || !content.trim()) return [];

  const lines = content.split(/\r?\n/);
  const words: HanziWord[] = [];
  const seenHanzi = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine || rawLine.startsWith('#') || rawLine.startsWith('//')) {
      continue;
    }

    // Split by comma, tab, pipe, colon, or semicolon
    let parts: string[] = [];
    if (rawLine.includes('\t')) {
      parts = rawLine.split('\t');
    } else if (rawLine.includes('|')) {
      parts = rawLine.split('|');
    } else if (rawLine.includes(',')) {
      parts = rawLine.split(',');
    } else if (rawLine.includes('：') || rawLine.includes(':')) {
      parts = rawLine.split(/[:：]/);
    } else if (rawLine.includes(' - ')) {
      parts = rawLine.split(' - ');
    } else {
      // Space separated if format is: "你好 ni hao hello" or just pure Hanzi string
      parts = [rawLine];
    }

    parts = parts.map(p => p.trim()).filter(Boolean);
    if (parts.length === 0) continue;

    let hanzi = '';
    let pinyin = '';
    let english = '';

    if (parts.length >= 3) {
      // e.g. "你好", "nǐ hǎo", "hello"
      hanzi = parts[0];
      pinyin = parts[1];
      english = parts.slice(2).join(', ');
    } else if (parts.length === 2) {
      // e.g. "你好", "nǐ hǎo" or "你好", "hello"
      hanzi = parts[0];
      // check if parts[1] is mostly latin pinyin or english
      const second = parts[1];
      if (/^[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ1-5\s]+$/.test(second)) {
        pinyin = second;
      } else {
        english = second;
      }
    } else if (parts.length === 1) {
      // Single item: could be "你好" or "你好 nǐ hǎo"
      const single = parts[0];
      const spaceParts = single.split(/\s+/);
      if (spaceParts.length >= 2 && /[\u4e00-\u9fa5]/.test(spaceParts[0])) {
        hanzi = spaceParts[0];
        pinyin = spaceParts.slice(1).join(' ');
      } else {
        // Pure Hanzi or mixed
        hanzi = single;
      }
    }

    // Extract Chinese characters only if hanzi contains extraneous symbols
    const chineseCharsOnly = hanzi.match(/[\u4e00-\u9fa5]+/g)?.join('') || '';
    if (!chineseCharsOnly) {
      // If no Chinese found on this line, skip
      continue;
    }
    hanzi = chineseCharsOnly;

    if (seenHanzi.has(hanzi)) continue;
    seenHanzi.add(hanzi);

    // Auto-fill Pinyin if not provided
    if (!pinyin) {
      // Check built-in dictionary
      const existing = HANZI_LOOKUP_MAP.get(hanzi);
      if (existing) {
        pinyin = existing.pinyin;
        if (!english) english = existing.english;
      } else {
        // Build pinyin from character map if possible
        const charPinyins: string[] = [];
        let charDef = '';
        for (const char of hanzi) {
          if (CHAR_PINYIN_MAP[char]) {
            charPinyins.push(CHAR_PINYIN_MAP[char].pinyin);
            if (!charDef && CHAR_PINYIN_MAP[char].english) {
              charDef = CHAR_PINYIN_MAP[char].english!;
            }
          } else {
            // fallback generic placeholder
            charPinyins.push(char);
          }
        }
        pinyin = charPinyins.join(' ');
        if (!english && charDef) english = charDef;
      }
    }

    const cleaned = cleanPinyin(pinyin || hanzi);
    if (!cleaned) continue;

    words.push({
      id: `custom-${Date.now()}-${i}`,
      hanzi,
      pinyin: pinyin || hanzi,
      pinyinClean: cleaned,
      pinyinSpaced: cleanPinyinWithSpaces(pinyin || hanzi),
      english: english || 'custom word',
      category: listName,
    });
  }

  return words;
}

/**
 * Generates sample TXT file content template for user to download or copy
 */
export function getSampleTxtTemplate(): string {
  return `# Hanzi Galaxy Defender - Custom Word List Template
# Format: Hanzi, Pinyin, English (Pinyin & English are optional if words are in dictionary)
你好, nǐ hǎo, hello
谢谢, xiè xie, thank you
再见, zài jiàn, goodbye
朋友, péng you, friend
喜欢, xǐ huan, to like
学习, xué xí, to study
太阳, tài yáng, sun
月亮, yuè liang, moon
星星, xīng xing, star
银河, yín hé, galaxy
宇宙, yǔ zhòu, universe
激光, jī guāng, laser beam
护盾, hù dùn, shield
速度, sù dù, speed
基地, jī dì, defense base
马到成功, mǎ dào chéng gōng, instant success
`;
}
