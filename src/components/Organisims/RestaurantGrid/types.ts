import { Restaurant } from '@/features/restaurants/types';

export interface RestaurantGridProps {
  restaurants: Restaurant[];
  searchQuery: string;
  onRestaurantClick: (id: string) => void;
}
