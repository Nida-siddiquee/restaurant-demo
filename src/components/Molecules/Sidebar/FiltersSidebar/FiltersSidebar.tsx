import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { resetFilters, setActiveFilters } from '@/features/restaurants/restaurantsSlice';
import {
  ClearButton,
  FilterRow,
  FiltersList,
  Sidebar,
  SidebarTitle,
  ToggleSwitch,
  TopRow,
  SectionTitle,
} from '../Sidebar.styled';
import { FILTERS } from '../constants';
import { FiltersSidebarProps } from '../types';
import SortingDropdown from '@/components/Molecules/SortingDropdown';

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ 
  totalRestaurants, 
  sortOption, 
  onSortChange 
}) => {
  const activeFilters = useSelector((s: RootState) => s.restaurants.activeFilters);
  const dispatch = useDispatch<AppDispatch>();
  const hasActiveFilters = Object.values(activeFilters).some(Boolean);
  const handleToggle = (id: string) => {
    dispatch(
      setActiveFilters({
        ...activeFilters,
        [id]: !activeFilters?.[id],
      }),
    );
  };
  const handleClear = () => {
    dispatch(resetFilters());
  };

  return (
    <Sidebar data-testid="sidebar" className="desktop-only" aria-labelledby="filters-title">
      <TopRow>
        <SidebarTitle id="filters-title" role="heading" aria-level={2}>
          {totalRestaurants} places
        </SidebarTitle>
        {hasActiveFilters && (
          <ClearButton 
            onClick={handleClear}
            aria-label="Clear all active filters"
          >
            Clear filters
          </ClearButton>
        )}
      </TopRow>
      
      <SectionTitle>Sort by</SectionTitle>
      <SortingDropdown value={sortOption} onChange={onSortChange} />
      
      <SectionTitle>Filter options</SectionTitle>
      <FiltersList role="group" aria-labelledby="filters-title">
        {FILTERS.map(f => (
          <FilterRow key={f.id}>
            {f.label}
            <ToggleSwitch 
              checked={!!activeFilters?.[f.id]} 
              onChange={() => handleToggle(f.id)}
              aria-label={f.label}
            />
          </FilterRow>
        ))}
      </FiltersList>
    </Sidebar>
  );
};

export default FiltersSidebar;
