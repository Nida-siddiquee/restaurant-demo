import { useMemo } from 'react';
import { Restaurant } from '@/features/restaurants/types';

export const useFilteredRestaurants = (
  restaurants: Restaurant[] | undefined,
  searchQuery: string,
  activeFilters: { [filterId: string]: boolean },
) => {
  return useMemo(() => {
    let list = restaurants ?? [];
    
    const filters = activeFilters ?? {};
    if (filters.free_delivery) {
      list = list.filter(restaurant => restaurant.deliveryCost === 0);
    }
    if (filters.open_now) {
      list = list.filter(restaurant => restaurant.isOpenNowForDelivery);
    }
    if (filters.with_discounts) {
      list = list.filter(restaurant => (restaurant.deals?.length ?? 0) > 0);
    }
    if (filters.collection) {
      list = list.filter(restaurant => restaurant.isCollection);
    }
    if (filters.new) {
      list = list.filter(restaurant => restaurant.isNew);
    }
    if (filters['four_star']) {
      list = list.filter(restaurant => (restaurant.rating?.starRating ?? 0) >= 4);
    }

    const query = searchQuery.trim().toLowerCase();
    if (!query) return list;
    
    return list.filter(restaurant =>
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.address?.city?.toLowerCase().includes(query) ||
      (restaurant.cuisines ?? []).some(cuisine => 
        cuisine.name.toLowerCase().includes(query)
      ),
    );
  }, [restaurants, searchQuery, activeFilters]);
};
