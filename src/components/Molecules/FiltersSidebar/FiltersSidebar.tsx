// src/components/Organisms/FiltersSidebar.tsx

import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { setActiveFilters } from '@/features/restaurants/restaurantsSlice';

// These would be ideally imported from the API/response/layout
const FILTERS = [
  { id: 'with_discounts', label: 'Offers & Savings' },
  { id: 'free_delivery', label: 'Free Delivery' },
  { id: 'four_star', label: '4+ Stars' },
  { id: 'open_now', label: 'Open Now' },
  { id: 'collection', label: 'Collection' },
  { id: 'new', label: 'New' },
];

const Sidebar = styled.aside`
  min-width: 210px;
  padding: 1.5rem 1rem 1rem 0;
  border-right: 1px solid #ececec;
  background: #fafbfc;
  @media (max-width: 800px) {
    display: none;
  }
`;
const FiltersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
`;

const FilterButton = styled.button<{ active: boolean }>`
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  background: ${({ active }) => (active ? 'var(--color-primary)' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: 1.5px solid var(--color-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ active }) =>
      active ? 'var(--color-primary-light)' : 'rgba(255,128,0,0.06)'};
  }
`;

const SidebarTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.1em;
  color: #222;
`;

const FiltersSidebar: React.FC = () => {
  const activeFilters = useSelector((s: RootState) => s.restaurants.activeFilters);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = (id: string) => {
    dispatch(
      setActiveFilters({
        ...activeFilters,
        [id]: !activeFilters?.[id]
      })
    );
  };

  return (
    <Sidebar>
      <SidebarTitle>Filters</SidebarTitle>
      <FiltersList>
        {FILTERS.map(f => (
          <FilterButton
            key={f.id}
            active={!!activeFilters?.[f.id]}
            onClick={() => handleToggle(f.id)}
          >
            {f.label}
          </FilterButton>
        ))}
      </FiltersList>
    </Sidebar>
  );
};

export default FiltersSidebar;