export interface SearchAndHeadingProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  restaurantCount: number;
}
