import { Restaurant } from '@/features/restaurants/types';
import { SortOption } from '@/utils/sorting';

export interface HomeContentProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  filteredRestaurants: Restaurant[];
  pageSlice: Restaurant[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  onRestaurantClick: (id: string) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}
