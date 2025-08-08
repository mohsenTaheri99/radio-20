import { useRef, useState } from "react";
import { $getRoot, $getSelection, $isRangeSelection } from "lexical";
// import { CodeHighlightNode, CodeNode } from "@lexical/code";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import SuggestList from "./SuggestList";
import BlurPlugin from "./BlurPlugin";

const initialConfig = {
  namespace: "SimpleTS",
  theme: {},
  onError: console.error,
  nodes: [],
};

export default function SimpleLexical() {
  const ref = useRef<HTMLDivElement>(null);
  const [suggests, setSuggests] = useState<string[]>([]);
  const [selectedsugg, setSelectedSugg] = useState<number>(0);

  const handelkeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("keydown", e.key);
    // if (suggests.length === 0) return;
    // switch (e.key) {
    //   case "ArrowDown":
    //     e.preventDefault();
    //     setSelectedSugg((e) => e + 1);
    //     break;
    //   case "ArrowUp":
    //     e.preventDefault();
    //     setSelectedSugg((e) => e - 1);
    //     break;
    //   case "Tab":
    //     e.preventDefault();
    //     console.log("add selcted sugg");
    //     break;

    //   default:
    //     break;
    // }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        ref={ref}
        style={{
          border: "1px solid #ccc",
          padding: 10,
          minHeight: 200,
          minWidth: 300,
        }}
        className=" "
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className=" outline-0 relative "
              onKeyDown={(e) => {
                handelkeyDown(e);
              }}
            />
          }
          placeholder={
            <div className=" absolute top-0 left-0">type somethng...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <BlurPlugin
          onBlur={() => {
            console.log("blure word");
          }}
        />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const root = $getRoot();
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                const offset = selection.anchor.offset;
                root.getAllTextNodes().forEach((element) => {
                  if (element.isSelected()) {
                    const beforCurser = element
                      .getTextContent()
                      .slice(0, offset);
                    beforCurser + " salame";
                    // console.log(getLastWord(beforCurser));
                    // setLastword(getLastWord(beforCurser));
                  }
                });
              }
              // console.log();
            });
          }}
        />
        <SuggestList
          callBackSeggestWord={(ws) => setSuggests(ws)}
          seletedNumber={selectedsugg}
        />
      </div>
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}
