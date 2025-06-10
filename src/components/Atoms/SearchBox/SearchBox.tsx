import React from 'react';
import styled from 'styled-components';

interface SearchBoxProps {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

const ICON_SIZE = 22;
const GAP = 8;
const LEFT_PAD = '1rem';

const SearchIcon = styled.span`
  position: absolute;
  left: ${LEFT_PAD};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;

  svg {
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;
    fill: var(--color-text);
  }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: ${LEFT_PAD};
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: ${ICON_SIZE - 2}px; /* slightly smaller so it fits */
    height: ${ICON_SIZE - 2}px;
    stroke: var(--color-text); /* use stroke for crisp lines   */
    stroke-width: 2.5;
    stroke-linecap: round;
    transition: stroke 0.2s ease;
  }

  &:hover svg {
    stroke: var(--color-primary);
  }
`;

const Input = styled.input`
  width: 100%;

  padding: 0.85rem ${ICON_SIZE + GAP + 12}px 0.85rem ${ICON_SIZE + GAP + 12}px;
  font-size: 1rem;
  border-radius: 2px;
  border: 2px solid var(--color-border);
  background: var(--color-card-bg);
  color: var(--color-text);

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.15);
    outline: none;
  }
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
  margin: 0.75rem 0;
`;

const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search…',
}) => {
  return (
    <Wrapper>
      <SearchIcon>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 4a7 7 0 015.29 11.71l4 4a1 1 0 11-1.42 1.42l-4-4A7 7 0 1111 4zm0 2a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      </SearchIcon>

      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />

      {!!value && onClear && (
        <ClearBtn onClick={onClear} aria-label="Clear search">
          <svg viewBox="0 0 24 24">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </ClearBtn>
      )}
    </Wrapper>
  );
};

export default SearchBox;
