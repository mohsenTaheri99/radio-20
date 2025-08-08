export function detectLanguage(str: string): "persian" | "english" | "unknown" {
  const persianRegex = /[\u0600-\u06FF]/;
  const englishRegex = /[a-zA-Z]/;

  if (persianRegex.test(str)) return "persian";
  if (englishRegex.test(str)) return "english";
  return "unknown";
}

import levenshtein from "fast-levenshtein";
export function getSimilarWords(
  inputWord: string,
  wordsArray: string[]
): string[] {
  const bestTen = wordsArray
    .map((word) => ({ word, distance: levenshtein.get(inputWord, word) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10);
  //remove word with less than 2 match char
  let matchWord = "";
  const notMatchRemoedArr = bestTen
    .filter((item) => {
      if (item.word === inputWord) matchWord = item.word;
      let cunter = 0;
      item.word.split("").forEach((char) => {
        if (inputWord.includes(char)) cunter++;
      });
      if (cunter === 0) return false;
      return cunter >= inputWord.length - 4;
    })
    .slice(0, 5);
  if (matchWord.length !== 0) return [matchWord];
  const ToFarWordRemoved = notMatchRemoedArr.filter((item) => {
    return item.distance <= 4 && inputWord.length >= 3;
  });

  return ToFarWordRemoved.map((item) => item.word);
}

export const getLastWord = (sentence: string) => {
  if (sentence[sentence.length - 1] === " ") return "";
  const words = sentence.split(/\s+/);
  return words[words.length - 1];
};
