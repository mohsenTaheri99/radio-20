import { useEffect, useRef, useState } from "react";
//@ts-ignore
import getCaretCoordinates from "textarea-caret";
import { detectLanguage } from "../../util";
import data from "../../all word/bigWord.json";

type porps = {
  placeholder?: string;
  initValue?: string;
  onChange: (value: string) => void;
};
const TextAreaAuto = function ({
  placeholder = "",
  onChange,
  initValue = "",
}: porps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [cursorPos, setCursorPos] = useState(0);
  const word: string[] = data as string[];
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const isRunTwoce = useRef<boolean>(false);
  const [sagPos, setPos] = useState<{ top: number; left: number }>();
  const [typingWord, setTypeingWord] = useState<string>("");
  const [slectedSugges, setSlectedSugges] = useState<number>(0);

  const handleCursorChange = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (textareaRef.current) {
      setCursorPos(textareaRef.current.selectionStart);
    }
    //tab -------------------------|
    if (e.key === "Tab") {
      setSuggestions(() => {
        return [];
      });
      if (!textareaRef.current) return;
      if (suggestions.length === 0) return;
      const textArea = textareaRef.current;
      const textValue = textArea.value;
      let i = 0;
      while (
        textValue[cursorPos - 1 - i] !== " " &&
        textValue[cursorPos - 1 - i] !== undefined
      ) {
        i++;
      }

      const startWord = textArea.selectionStart - i;
      const endWord = textArea.selectionStart;
      const result =
        textValue.slice(0, startWord) +
        suggestions[slectedSugges] +
        " " +
        textValue.slice(endWord);
      textArea.value = result;
      textArea.selectionStart =
        startWord + suggestions[slectedSugges].length + 1;
      textArea.selectionEnd = startWord + suggestions[slectedSugges].length + 1;
      e.preventDefault();
    }
  };
  //hadnel arrow key -----------|
  const handelArrowKey = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (isRunTwoce.current) {
        isRunTwoce.current = false;
        return;
      }
      isRunTwoce.current = true;
      setSlectedSugges((prev) =>
        prev >= suggestions.length ? prev : prev + 1
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isRunTwoce.current) {
        isRunTwoce.current = false;
        return;
      }
      isRunTwoce.current = true;
      setSlectedSugges((prev) => {
        const value = prev - 1;
        if (value <= 0) return 0;
        else return value;
      });
    }
  };
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.value = initValue;
  }, []);
  useEffect(() => {
    if (!textareaRef.current) return;
    const text = textareaRef.current.value;
    if (!(text[cursorPos] === undefined || text[cursorPos] === " ")) {
      setSuggestions(() => {
        return [];
      });
      return;
    }
    if (text[cursorPos - 1] === undefined || text[cursorPos - 1] == " ") {
      setSuggestions(() => {
        return [];
      });
      return;
    }
    const coords = getCaretCoordinates(
      textareaRef.current,
      textareaRef.current.selectionStart
    );

    setPos({ top: coords.top, left: coords.left });
    let lastWord = "";
    let i = 0;
    while (
      text[cursorPos - 1 - i] !== " " &&
      text[cursorPos - 1 - i] !== undefined
    ) {
      lastWord += text[cursorPos - 1 - i];
      i++;
    }
    if (i <= 1) {
      setSuggestions(() => {
        return [];
      });
      return;
    }
    const realeLastword = lastWord.split("").reverse().join("");
    setTypeingWord(realeLastword);
    setSuggestions(() => {
      return [];
    });
    let count = 0;
    for (const w of word) {
      if (w.includes(realeLastword) && w !== realeLastword) {
        setSuggestions((s) => [...s, w]);
        count++;
        if (count >= 5) break;
      }
    }
  }, [cursorPos]);

  return (
    <div className="font-semibold w-full ">
      <div className=" relative w-full">
        <textarea
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          ref={textareaRef}
          onKeyUp={(e) => {
            handleCursorChange(e);
            handelArrowKey(e);
          }}
          onKeyDown={(e) => {
            handleCursorChange(e);
            handelArrowKey(e);
          }}
          rows={5}
          cols={50}
          className="text-gray-900 font-light   w-full p-4 pt-2 border-1 border-gray-300 rounded focus:outline-blue-400 "
        ></textarea>

        <div
          className="bg-gray-100  w-[10rem]   absolute "
          style={{
            display: suggestions.length === 0 ? "none" : "unset",
            top: sagPos?.top,
            left: sagPos?.left,
            transform: `translate(calc(-100%  ) , 1.5rem )`,
          }}
        >
          {suggestions.map((suggest, i) => {
            return (
              <div
                className={`w-full rtl border pl-2 pr-2  ${
                  detectLanguage(suggest) === "persian"
                    ? "rtl text-right"
                    : "ltr text-left"
                }
                ${
                  i === slectedSugges
                    ? "border-blue-400 border-2"
                    : "border-gray-400"
                }
                `}
              >
                <span className="text-blue-500">{typingWord}</span>
                <span className="text-black">
                  {suggest.slice(typingWord.length)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TextAreaAuto;
