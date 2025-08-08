import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { BLUR_COMMAND } from "lexical";
type Props = {
  onBlur: () => void;
};
const BlurPlugin = ({ onBlur }: Props) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      BLUR_COMMAND,
      (payload) => {
        console.log("Editor blurred!", payload);
        onBlur();
        return true;
      },
      0
    );
  }, [editor]);

  return null;
};
export default BlurPlugin;
