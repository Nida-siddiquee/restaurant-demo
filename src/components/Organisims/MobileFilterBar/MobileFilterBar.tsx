import React from 'react';
import { FilterContainer, FilterButton, Icon } from './MobileFilterBar.styled';
import { ClearButton } from '@/components/Molecules/Sidebar/Sidebar.styled';
import FilterIcon from '@/assets/filterIcon.svg';
import { MobileFilterBarProps } from './types';

const MobileFilterBar: React.FC<MobileFilterBarProps> = ({
  hasActiveFilters,
  onFilterClick,
  onClearFilters,
}) => {
  return (
    <FilterContainer className="mobile-only">
      <FilterButton
        aria-label={`Open filters${hasActiveFilters ? ' (filters active)' : ''}`}
        onClick={onFilterClick}
        type="button"
      >
        <Icon src={FilterIcon} alt="" role="presentation" />
      </FilterButton>
      {hasActiveFilters && (
        <ClearButton onClick={onClearFilters} type="button" aria-label="Clear all active filters">
          Clear filters
        </ClearButton>
      )}
    </FilterContainer>
  );
};

export default MobileFilterBar;
