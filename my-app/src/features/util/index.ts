export function getFirstWordBeforeCursor(): string | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  const container = range.startContainer;
  const offset = range.startOffset;

  if (container.nodeType !== Node.TEXT_NODE) return null;

  const text = (container as Text).textContent || "";
  const beforeCursor = text.slice(0, offset);

  if (!beforeCursor) return null;
  if (beforeCursor[beforeCursor.length - 1] === " ") return null;
  const words = beforeCursor.split(/\s+/);
  const lastWord = words[words.length - 1] || null;

  return lastWord || null;
}

export const insertTextAtCursor = (text: string) => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  const preRange = range.cloneRange();

  // Move preRange to get text before cursor
  preRange.setStart(preRange.startContainer, 0);
  const beforeCursor = preRange.toString();

  // Find last word before cursor using regex
  const match = beforeCursor.match(/(\S+)\s*$/);
  if (!match) return;

  const lastWord = match[1];
  const offsetToDelete = lastWord.length;

  // Move the original range back to delete the word
  range.setStart(range.startContainer, range.startOffset - offsetToDelete);
  range.deleteContents();

  // Insert new text
  const textNode = document.createTextNode(text);
  range.insertNode(textNode);

  // Move cursor to end of inserted text
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  sel.removeAllRanges();
  sel.addRange(range);
};

// export function getCursorPosition(): { x: number; y: number } | null {
//   const sel = window.getSelection();
//   if (!sel || sel.rangeCount === 0) return null;

//   const range = sel.getRangeAt(0).cloneRange();

//   if (range.getClientRects().length === 0) {
//     range.setStart(range.endContainer, range.endOffset);
//     range.setEnd(range.endContainer, range.endOffset);
//   }

//   const rect = range.getClientRects()[0];
//   if (!rect) return null;

//   return { x: rect.left, y: rect.bottom };
// }

export function getCursorPosition(): { x: number; y: number } | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0).cloneRange();

  if (range.collapsed) {
    const dummy = document.createElement("span");
    dummy.textContent = "\u200b"; // zero-width space
    range.insertNode(dummy);
    const rect = dummy.getBoundingClientRect();
    dummy.remove();
    return { x: rect.left, y: rect.bottom };
  }

  const rect = range.getBoundingClientRect();
  return { x: rect.left, y: rect.bottom };
}
