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
} from '../Sidebar.styled';
import { FILTERS } from '../constants';

type Props = {
  open: boolean;
  onClose: () => void;
};

const FiltersSidebarDrawer: React.FC<Props> = ({ open, onClose }) => {
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
  if (!open) return null;
  return (
    <>
      <Overlay data-testid="overlay" open={open} onClick={onClose} />
      <Drawer open={open}>
        <SidebarTitle>
          Filters
          <CloseBtn aria-label="Close filters" onClick={onClose}>
            ×
          </CloseBtn>
        </SidebarTitle>
        <FiltersList>
          {FILTERS.map(f => (
            <FilterRow key={f.id}>
              {f.label}
              <ToggleSwitch checked={!!activeFilters?.[f.id]} onChange={() => handleToggle(f.id)} />
            </FilterRow>
          ))}
        </FiltersList>
      </Drawer>
    </>
  );
};
export default FiltersSidebarDrawer;
