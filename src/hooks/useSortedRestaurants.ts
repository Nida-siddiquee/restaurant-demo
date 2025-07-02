import { useMemo } from 'react';
import { Restaurant } from '@/features/restaurants/types';
import { SortOption, sortRestaurants } from '@/utils/sorting';

export const useSortedRestaurants = (
  restaurants: Restaurant[] | undefined,
  sortOption: SortOption,
) => {
  return useMemo(() => {
    if (!restaurants || restaurants.length === 0) {
      return [];
    }
    
    return sortRestaurants(restaurants, sortOption);
  }, [restaurants, sortOption]);
};