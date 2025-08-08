import { useEffect, useState } from "react";
import { getCursorPosition } from "../../util";
import { detectLanguage, getSimilarWords } from "../../../util";
import { highlightMatch } from "./ui/highlightMatch";

type SuggestPropsType = {
  typedWord: string | null;
  seletedNumber: number;
  callBackSeggestWord: (words: string[]) => void;
};

const testWords = ["hello", "how", "mohsen", "baba"];

const SuggestList = ({
  typedWord,
  callBackSeggestWord,
  seletedNumber,
}: SuggestPropsType) => {
  const [suggests, setSuggests] = useState<string[]>([]);
  useEffect(() => {
    if (!typedWord) return;
    const similerWord = getSimilarWords(typedWord, testWords);
    if (!similerWord) return;
    setSuggests(similerWord);
    callBackSeggestWord(similerWord);
  }, [typedWord, seletedNumber]);
  return (
    <div
      className=" absolute w-30"
      style={{
        left: getCursorPosition()?.x,
        top: getCursorPosition()?.y,
        display: typedWord && typedWord?.length >= 0 ? "unset" : "none",
        transform: `translate(calc(-100% ) ,0.1rem )`,
      }}
    >
      {suggests.map((sugg, i) => {
        if (!typedWord) return;
        return (
          <div
            key={i}
            className={`w-full rtl border pl-2 pr-2  ${
              detectLanguage(sugg) === "persian"
                ? "rtl text-right"
                : "ltr text-left"
            }
            ${i === 0 ? "border-blue-400 border-2" : "border-gray-400"}
                          `}
          >
            {highlightMatch(sugg, typedWord)}
          </div>
        );
      })}
    </div>
  );
};
export default SuggestList;
