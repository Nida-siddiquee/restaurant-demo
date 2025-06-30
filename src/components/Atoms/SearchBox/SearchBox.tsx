import React from 'react';
import { ClearBtn, Input, SearchIcon, Wrapper } from './SearchBox.styled';

interface SearchBoxProps {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search…',
}) => {
  const inputId = React.useId();
  
  return (
    <Wrapper role="search">
      <SearchIcon aria-hidden="true">
        <svg data-testid="search-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 4a7 7 0 015.29 11.71l4 4a1 1 0 11-1.42 1.42l-4-4A7 7 0 1111 4zm0 2a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      </SearchIcon>

      <Input
        id={inputId}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        aria-label="Search restaurants"
        aria-describedby={value ? `${inputId}-clear` : undefined}
      />

      {!!value && onClear && (
        <ClearBtn 
          onClick={onClear} 
          aria-label="Clear search"
          id={`${inputId}-clear`}
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </ClearBtn>
      )}
    </Wrapper>
  );
};

export default SearchBox;
