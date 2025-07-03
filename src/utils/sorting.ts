import { Restaurant } from '@/features/restaurants/types';

export enum SortOption {
  NONE = 'none',
  RATING_HIGH_TO_LOW = 'rating_high_to_low',
  DELIVERY_COST_LOW_TO_HIGH = 'delivery_cost_low_to_high',
  MIN_ORDER_LOW_TO_HIGH = 'min_order_low_to_high',
  DISTANCE_NEAR_TO_FAR = 'distance_near_to_far',
}

export const sortRestaurants = (
  restaurants: Restaurant[],
  sortOption: SortOption,
): Restaurant[] => {
  const sortedRestaurants = [...restaurants];

  switch (sortOption) {
    case SortOption.RATING_HIGH_TO_LOW:
      return sortedRestaurants.sort(
        (a, b) => (b.rating?.starRating || 0) - (a.rating?.starRating || 0),
      );

    case SortOption.DELIVERY_COST_LOW_TO_HIGH:
      return sortedRestaurants.sort((a, b) => (a.deliveryCost || 0) - (b.deliveryCost || 0));

    case SortOption.MIN_ORDER_LOW_TO_HIGH:
      return sortedRestaurants.sort(
        (a, b) => (a.minimumDeliveryValue || 0) - (b.minimumDeliveryValue || 0),
      );

    case SortOption.DISTANCE_NEAR_TO_FAR:
      return sortedRestaurants.sort(
        (a, b) => (a.driveDistanceMeters || 0) - (b.driveDistanceMeters || 0),
      );

    case SortOption.NONE:
    default:
      return sortedRestaurants;
  }
};
