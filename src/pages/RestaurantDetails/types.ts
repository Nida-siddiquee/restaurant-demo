import { Restaurant } from '@/features/restaurants/types';
import { CustomError } from '@/utils/errors';

export interface RestaurantContentProps {
  restaurant: Restaurant;
  pageRef: React.RefObject<HTMLDivElement | null>;
}

export interface RestaurantErrorStateProps {
  error: CustomError;
  onRetry?: () => void;
  onGoHome: () => void;
}
