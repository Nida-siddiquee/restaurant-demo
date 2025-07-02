import { CustomError } from '@/utils/errors';

export interface RestaurantErrorStateProps {
  error: CustomError;
  onRetry?: () => void;
  onGoHome: () => void;
}
