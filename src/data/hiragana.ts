/**
 * Hiragana character interface
 */
export interface Hiragana {
  character: string;  // The hiragana character
  romaji: string;    // Romanized pronunciation
  korean: string;    // Korean pronunciation
}

/**
 * Complete list of hiragana characters
 * Organized by rows (あ, か, さ, etc.)
 */
export const hiraganaList: Hiragana[] = [
  // あ row
  { character: 'あ', romaji: 'a', korean: '아' },
  { character: 'い', romaji: 'i', korean: '이' },
  { character: 'う', romaji: 'u', korean: '우' },
  { character: 'え', romaji: 'e', korean: '에' },
  { character: 'お', romaji: 'o', korean: '오' },
  
  // か row
  { character: 'か', romaji: 'ka', korean: '카' },
  { character: 'き', romaji: 'ki', korean: '키' },
  { character: 'く', romaji: 'ku', korean: '쿠' },
  { character: 'け', romaji: 'ke', korean: '케' },
  { character: 'こ', romaji: 'ko', korean: '코' },
  
  // さ row
  { character: 'さ', romaji: 'sa', korean: '사' },
  { character: 'し', romaji: 'shi', korean: '시' },
  { character: 'す', romaji: 'su', korean: '스' },
  { character: 'せ', romaji: 'se', korean: '세' },
  { character: 'そ', romaji: 'so', korean: '소' },
  
  // た row
  { character: 'た', romaji: 'ta', korean: '타' },
  { character: 'ち', romaji: 'chi', korean: '치' },
  { character: 'つ', romaji: 'tsu', korean: '츠' },
  { character: 'て', romaji: 'te', korean: '테' },
  { character: 'と', romaji: 'to', korean: '토' },
  
  // な row
  { character: 'な', romaji: 'na', korean: '나' },
  { character: 'に', romaji: 'ni', korean: '니' },
  { character: 'ぬ', romaji: 'nu', korean: '누' },
  { character: 'ね', romaji: 'ne', korean: '네' },
  { character: 'の', romaji: 'no', korean: '노' },
  
  // は row
  { character: 'は', romaji: 'ha', korean: '하' },
  { character: 'ひ', romaji: 'hi', korean: '히' },
  { character: 'ふ', romaji: 'fu', korean: '후' },
  { character: 'へ', romaji: 'he', korean: '헤' },
  { character: 'ほ', romaji: 'ho', korean: '호' },
  
  // ま row
  { character: 'ま', romaji: 'ma', korean: '마' },
  { character: 'み', romaji: 'mi', korean: '미' },
  { character: 'む', romaji: 'mu', korean: '무' },
  { character: 'め', romaji: 'me', korean: '메' },
  { character: 'も', romaji: 'mo', korean: '모' },
  
  // や row
  { character: 'や', romaji: 'ya', korean: '야' },
  { character: 'ゆ', romaji: 'yu', korean: '유' },
  { character: 'よ', romaji: 'yo', korean: '요' },
  
  // ら row
  { character: 'ら', romaji: 'ra', korean: '라' },
  { character: 'り', romaji: 'ri', korean: '리' },
  { character: 'る', romaji: 'ru', korean: '루' },
  { character: 'れ', romaji: 're', korean: '레' },
  { character: 'ろ', romaji: 'ro', korean: '로' },
  
  // わ row
  { character: 'わ', romaji: 'wa', korean: '와' },
  { character: 'を', romaji: 'wo', korean: '오' },
  { character: 'ん', romaji: 'n', korean: '응' },
]; 