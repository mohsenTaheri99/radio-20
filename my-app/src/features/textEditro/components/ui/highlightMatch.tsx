export function highlightMatch(word: string, input: string) {
  const index = word.indexOf(input);
  if (index === -1) return <span>{word}</span>;

  const before = word.slice(0, index);
  const match = word.slice(index, index + input.length);
  const after = word.slice(index + input.length);

  return (
    <span>
      {before}
      <span className="text-blue-400">{match}</span>
      {after}
    </span>
  );
}
