import React from 'react';
import { FilterContainer, FilterButton, Icon } from './MobileFilterBar.styled';
import { ClearButton } from '@/components/Molecules/Sidebar/Sidebar.styled';
import FilterIcon from '@/assets/filterIcon.svg';

interface MobileFilterBarProps {
  hasActiveFilters: boolean;
  onFilterClick: () => void;
  onClearFilters: () => void;
}

const MobileFilterBar: React.FC<MobileFilterBarProps> = ({
  hasActiveFilters,
  onFilterClick,
  onClearFilters,
}) => {
  return (
    <FilterContainer className="mobile-only">
      <FilterButton aria-label="Open filters" onClick={onFilterClick}>
        <Icon src={FilterIcon} alt="Filter icon" />
      </FilterButton>
      {hasActiveFilters && (
        <ClearButton onClick={onClearFilters}>Clear filters</ClearButton>
      )}
    </FilterContainer>
  );
};

export default MobileFilterBar;
