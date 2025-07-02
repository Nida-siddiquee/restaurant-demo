import React from 'react';
import SearchBox from '@/components/Atoms/SearchBox';
import { SubHeading } from './SearchAndHeading.styled';
import { SearchAndHeadingProps } from './types';

const SearchAndHeading: React.FC<SearchAndHeadingProps> = ({
  searchInput,
  onSearchChange,
  onSearchClear,
  restaurantCount,
}) => {
  return (
    <>
      <SearchBox
        value={searchInput}
        onChange={onSearchChange}
        onClear={onSearchClear}
        placeholder="Search by name, location, cuisine…"
      />
      <SubHeading id="restaurant-count">
        Order from {restaurantCount} place{restaurantCount !== 1 && 's'}
      </SubHeading>
    </>
  );
};

export default SearchAndHeading;
