import { render } from '@testing-library/react';
import { highlightMatch } from './highlightMatch';

describe('highlightMatch', () => {
  it('returns text as is if query is empty', () => {
    const { container } = render(<>{highlightMatch('Hello World', '')}</>);
    expect(container.textContent).toBe('Hello World');
    expect(container.querySelector('mark')).toBeNull();
  });

  it('highlights matching text (case insensitive)', () => {
    const { container } = render(<>{highlightMatch('Chicken Burger', 'chicken')}</>);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark?.textContent?.toLowerCase()).toBe('chicken');
    expect(container.textContent).toContain('Burger');
  });

  it('highlights all matches in text', () => {
    const { container } = render(<>{highlightMatch('pizza pizza pizza', 'pizza')}</>);
    expect(container.querySelectorAll('mark').length).toBe(3);
    expect(container.textContent).toBe('pizza pizza pizza');
  });

  it('highlights matches regardless of case', () => {
    const { container } = render(<>{highlightMatch('Peri Peri', 'peri')}</>);
    expect(container.querySelectorAll('mark').length).toBe(2);
  });

  it('returns plain text if no match', () => {
    const { container } = render(<>{highlightMatch('Falafel Wrap', 'kebab')}</>);
    expect(container.textContent).toBe('Falafel Wrap');
    expect(container.querySelector('mark')).toBeNull();
  });

  it('handles special regex characters in query', () => {
    const { container } = render(<>{highlightMatch('A.B', '.')}</>);
    expect(container.querySelectorAll('mark').length).toBe(1);
    expect(container.textContent).toBe('A.B');
  });

  it('handles multi-word query', () => {
    const { container } = render(<>{highlightMatch('Fish and Chips', 'and chips')}</>);
    expect(container.querySelectorAll('mark').length).toBe(1);
    expect(container.querySelector('mark')?.textContent).toBe('and Chips');
  });
});
