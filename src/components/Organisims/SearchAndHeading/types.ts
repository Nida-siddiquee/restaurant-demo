import { SortOption } from '@/utils/sorting';

export interface SearchAndHeadingProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  restaurantCount: number;
  sortOption?: SortOption;
  onSortChange?: (option: SortOption) => void;
}
