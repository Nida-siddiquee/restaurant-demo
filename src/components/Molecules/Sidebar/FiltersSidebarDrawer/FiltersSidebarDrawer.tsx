import { useEffect } from 'react';
import { AppDispatch, RootState } from '@/app/store';
import { setActiveFilters } from '@/features/restaurants/restaurantsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  CloseBtn,
  Drawer,
  FilterRow,
  FiltersList,
  Overlay,
  SidebarTitle,
  ToggleSwitch,
  SectionTitle,
} from '../Sidebar.styled';
import { FILTERS } from '../constants';
import { FiltersSidebarDrawerProps } from '../types';
import SortingDropdown from '@/components/Molecules/SortingDropdown';

const FiltersSidebarDrawer: React.FC<FiltersSidebarDrawerProps> = ({ 
  open, 
  onClose, 
  sortOption, 
  onSortChange 
}) => {
  const activeFilters = useSelector((s: RootState) => s.restaurants.activeFilters);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = (id: string) => {
    dispatch(
      setActiveFilters({
        ...activeFilters,
        [id]: !activeFilters?.[id],
      }),
    );
  };

  useEffect(() => {
    if (open) {
      const drawer = document.querySelector('[role="dialog"]');
      if (drawer) {
        (drawer as HTMLElement).focus();
      }
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  
  return (
    <>
      <Overlay 
        data-testid="overlay" 
        open={open} 
        onClick={onClose}
        aria-hidden="true"
      />
      <Drawer 
        open={open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        tabIndex={-1}
      >
        <SidebarTitle id="filter-title">
          Filters
          <CloseBtn 
            aria-label="Close filters dialog" 
            onClick={onClose}
            type="button"
          >
            ×
          </CloseBtn>
        </SidebarTitle>
        
        <SectionTitle>Sort by</SectionTitle>
        <SortingDropdown value={sortOption} onChange={onSortChange} />
        
        <SectionTitle>Filter options</SectionTitle>
        <FiltersList role="group" aria-labelledby="filter-title">
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
      </Drawer>
    </>
  );
};
export default FiltersSidebarDrawer;
