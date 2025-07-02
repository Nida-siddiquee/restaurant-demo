import { useMemo } from 'react';
import { Restaurant } from '@/features/restaurants/types';

export const usePagination = (
  restaurants: Restaurant[],
  currentPage: number,
  restaurantsPerPage: number = 30,
) => {
  return useMemo(() => {
    const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);
    const startIdx = (currentPage - 1) * restaurantsPerPage;
    const pageSlice = restaurants.slice(startIdx, startIdx + restaurantsPerPage);
    
    return {
      totalPages,
      pageSlice,
      startIdx,
    };
  }, [restaurants, currentPage, restaurantsPerPage]);
};
