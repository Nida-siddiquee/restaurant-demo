import { SortOption } from '@/utils/sorting';

export interface FiltersSidebarProps {
  totalRestaurants: number;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export interface FiltersSidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}
