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
} from '../Sidebar.styled';
import { FILTERS } from '../constants';

interface FiltersSidebarProps {
  totalRestaurants: number;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ totalRestaurants }) => {
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
    <Sidebar data-testid="sidebar" className="desktop-only">
      <TopRow>
        <SidebarTitle>{totalRestaurants} places</SidebarTitle>
        {hasActiveFilters && <ClearButton onClick={handleClear}>Clear filters</ClearButton>}
      </TopRow>
      <FiltersList>
        {FILTERS.map(f => (
          <FilterRow key={f.id}>
            {f.label}
            <ToggleSwitch checked={!!activeFilters?.[f.id]} onChange={() => handleToggle(f.id)} />
          </FilterRow>
        ))}
      </FiltersList>
    </Sidebar>
  );
};

export default FiltersSidebar;
