function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, 'ig');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-text)' }}
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
