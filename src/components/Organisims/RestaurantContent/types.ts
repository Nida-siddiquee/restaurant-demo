import { Restaurant } from '@/features/restaurants/types';

export interface RestaurantContentProps {
  restaurant: Restaurant;
  pageRef: React.RefObject<HTMLDivElement | null>;
}
