import React, { useEffect, useRef, useState } from "react";
import ContentEditable, {
  type ContentEditableEvent,
} from "react-contenteditable";
import { getFirstWordBeforeCursor, insertTextAtCursor } from "../../util";
import SuggestList from "./SuggestList";

type CEditProps = {
  className?: string;
};
const CEdit = (props: CEditProps) => {
  const [lastTypeingWord, setLastTypeingword] = useState<string | null>(null);
  const [slectedNumber, setSelectedNumber] = useState<number>(0);
  const [seletedSegestWord, setSeletedSuggestWord] = useState<string>("hello");
  const [hitTap, setHitTap] = useState<boolean>(false);

  const [html, setHtml] = useState("متن اولیه");
  const contentRef = useRef<any>(null);
  const handleChange = (e: ContentEditableEvent) => {
    setHtml(e.target.value);
    setLastTypeingword(getFirstWordBeforeCursor());
  };
  const callBackSeggestWord = function (words: string[]) {
    if (words) setSeletedSuggestWord(() => words[slectedNumber]);
    else console.log("word is undefind");
  };
  useEffect(() => {
    insertTextAtCursor(seletedSegestWord);
  }, [hitTap]);
  const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    // console.log(seletedSegestWord);
    // console.log(lastTypeingWord);
    switch (e.key) {
      case "Tab":
        {
          e.preventDefault();
          console.log(seletedSegestWord);
          setHitTap((h) => !h);
          setLastTypeingword(() => null);
        }
        break;
      // case "ArrowDown":
      //   {
      //     e.preventDefault();
      //     if (e.type === "keyup") return;
      //     insertTextAtCursor("اولیه");
      //   }
      //   break;
      // case "ArrowUp":
      //   {
      //     e.preventDefault();
      //     if (e.type === "keyup") return;

      //     insertTextAtCursor("اولیه");
      //   }
      //   break;
      default:
        break;
    }

    const editableDiv = (e.currentTarget as HTMLElement).closest(
      'div[contenteditable="true"]'
    );
    const value = editableDiv?.textContent; // یا textContent
    if (!value) return;
    setHtml(value);
  };
  return (
    <div className={props.className}>
      <ContentEditable
        onBlur={(e: any) => {
          setLastTypeingword(null);
          const value = e.textContent; // یا textContent
          if (!value) return;
          setHtml(value);
        }}
        innerRef={contentRef}
        html={html}
        disabled={false}
        onChange={handleChange}
        className={" w-full focus:outline-none focus:border-0"}
        tagName="div"
        onClick={() => {}}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
          handleKey(e);
        }}
        onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => {
          handleKey(e);
        }}
      />
      <SuggestList
        typedWord={lastTypeingWord}
        seletedNumber={slectedNumber}
        callBackSeggestWord={callBackSeggestWord}
      />
    </div>
  );
};

export default CEdit;
