import { useEffect, useState } from "react";
import { getCursorPosition, getFirstWordBeforeCursor } from "../util";
import { detectLanguage, getSimilarWords } from "../../../util";
import { highlightMatch } from "./ui/highlightMatch";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, TextNode } from "lexical";
type SuggestPropsType = {
  seletedNumber: number;
  callBackSeggestWord: (words: string[]) => void;
};

const testWords = ["سلام", "خوبی", "من خوبم", "تو"];

const SuggestList = ({
  callBackSeggestWord,
  seletedNumber,
}: SuggestPropsType) => {
  const [editor] = useLexicalComposerContext();
  const [suggests, setSuggests] = useState<string[]>([]);
  const [lastWord, setLastWord] = useState<string>("");
  useEffect(() => {
    if (lastWord === "") return;
    const similerWord = getSimilarWords(lastWord, testWords);
    if (!similerWord) return;
    setSuggests(similerWord);
    callBackSeggestWord(similerWord);
  }, [lastWord]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        setLastWord(getFirstWordBeforeCursor());
      });
    });
  }, [editor]);

  if ((suggests.length <= 0 && lastWord !== "", !getCursorPosition()))
    return <></>;

  return (
    <div
      className=" absolute w-30"
      style={{
        left: (getCursorPosition()?.x ?? 0) + "px",
        top: (getCursorPosition()?.y ?? 0) + "px",
        transform: `translate(calc(-100% ) ,0.1rem )`,
      }}
    >
      {suggests.map((sugg, i) => {
        if (!lastWord) return;
        return (
          <div
            key={i}
            // onClick={}
            className={`w-full rtl border pl-2 pr-2 border-gray-400 ${
              detectLanguage(sugg) === "persian"
                ? "rtl text-right"
                : "ltr text-left"
            }
            ${i === seletedNumber ? " outline-blue-400 outline-2" : ""}
                          `}
          >
            {highlightMatch(sugg, lastWord)}
          </div>
        );
      })}
    </div>
  );
};
export default SuggestList;
