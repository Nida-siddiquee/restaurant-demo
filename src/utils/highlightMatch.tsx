export function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'ig');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ background: '#ffe08a', color: '#262626' }}>{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
}