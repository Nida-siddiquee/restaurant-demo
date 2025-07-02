import { renderHook } from '@testing-library/react';
import { useFilteredRestaurants } from './useFilteredRestaurants';
import { mockRestaurantsResponse } from '@/features/restaurants/mockRestaurantsResponse';

describe('useFilteredRestaurants', () => {
  const mockRestaurants = mockRestaurantsResponse.restaurants.slice(0, 10);

  it('returns all restaurants when no search query or filters', () => {
    const { result } = renderHook(() => useFilteredRestaurants(mockRestaurants, '', {}));

    expect(result.current).toHaveLength(mockRestaurants.length);
  });

  it('filters restaurants by search query (name)', () => {
    const searchQuery = mockRestaurants[0].name.toLowerCase().substring(0, 5);
    const { result } = renderHook(() => useFilteredRestaurants(mockRestaurants, searchQuery, {}));

    expect(result.current.length).toBeGreaterThan(0);
    expect(
      result.current.every(restaurant => restaurant.name.toLowerCase().includes(searchQuery)),
    ).toBe(true);
  });

  it('filters restaurants by search query (city)', () => {
    const cityName = mockRestaurants[0].address.city.toLowerCase();
    const { result } = renderHook(() => useFilteredRestaurants(mockRestaurants, cityName, {}));

    expect(result.current.length).toBeGreaterThan(0);
    expect(
      result.current.every(restaurant => restaurant.address.city.toLowerCase().includes(cityName)),
    ).toBe(true);
  });

  it('filters restaurants by search query (cuisine)', () => {
    const restaurantWithCuisine = mockRestaurants.find(r => r.cuisines && r.cuisines.length > 0);
    if (restaurantWithCuisine) {
      const cuisineName = restaurantWithCuisine.cuisines[0].name.toLowerCase();
      const { result } = renderHook(() => useFilteredRestaurants(mockRestaurants, cuisineName, {}));

      expect(result.current.length).toBeGreaterThan(0);
      expect(
        result.current.some(restaurant =>
          restaurant.cuisines?.some(cuisine => cuisine.name.toLowerCase().includes(cuisineName)),
        ),
      ).toBe(true);
    }
  });

  it('filters restaurants by free delivery', () => {
    const { result } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, '', { free_delivery: true }),
    );

    expect(result.current.every(restaurant => restaurant.deliveryCost === 0)).toBe(true);
  });

  it('filters restaurants by open now', () => {
    const { result } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, '', { open_now: true }),
    );

    expect(result.current.every(restaurant => restaurant.isOpenNowForDelivery)).toBe(true);
  });

  it('filters restaurants by deals/discounts', () => {
    const { result } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, '', { with_discounts: true }),
    );

    expect(result.current.every(restaurant => (restaurant.deals?.length ?? 0) > 0)).toBe(true);
  });

  it('filters restaurants by collection availability', () => {
    const { result } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, '', { collection: true }),
    );

    expect(result.current.every(restaurant => restaurant.isCollection)).toBe(true);
  });

  it('filters restaurants by new status', () => {
    const { result } = renderHook(() => useFilteredRestaurants(mockRestaurants, '', { new: true }));

    expect(result.current.every(restaurant => restaurant.isNew)).toBe(true);
  });

  it('filters restaurants by 4+ star rating', () => {
    const { result } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, '', { four_star: true }),
    );

    expect(result.current.every(restaurant => (restaurant.rating?.starRating ?? 0) >= 4)).toBe(
      true,
    );
  });

  it('applies multiple filters correctly', () => {
    const { result } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, '', {
        free_delivery: true,
        open_now: true,
      }),
    );

    expect(
      result.current.every(
        restaurant => restaurant.deliveryCost === 0 && restaurant.isOpenNowForDelivery,
      ),
    ).toBe(true);
  });

  it('applies search query and filters together', () => {
    const searchQuery = 'a';
    const { result } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, searchQuery, { open_now: true }),
    );

    result.current.forEach(restaurant => {
      expect(restaurant.isOpenNowForDelivery).toBe(true);
      expect(
        restaurant.name.toLowerCase().includes(searchQuery) ||
          restaurant.address.city.toLowerCase().includes(searchQuery) ||
          restaurant.cuisines?.some(cuisine => cuisine.name.toLowerCase().includes(searchQuery)),
      ).toBe(true);
    });
  });

  it('handles undefined restaurants array', () => {
    const { result } = renderHook(() => useFilteredRestaurants(undefined, 'test', {}));

    expect(result.current).toEqual([]);
  });

  it('handles empty restaurants array', () => {
    const { result } = renderHook(() => useFilteredRestaurants([], 'test', {}));

    expect(result.current).toEqual([]);
  });

  it('trims search query', () => {
    const searchQuery = '  test  ';
    const { result } = renderHook(() => useFilteredRestaurants(mockRestaurants, searchQuery, {}));

    expect(result.current).toBeDefined();
  });

  it('is case insensitive for search', () => {
    const restaurantName = mockRestaurants[0].name;
    const upperCaseQuery = restaurantName.toUpperCase().substring(0, 5);
    const lowerCaseQuery = restaurantName.toLowerCase().substring(0, 5);

    const { result: upperResult } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, upperCaseQuery, {}),
    );

    const { result: lowerResult } = renderHook(() =>
      useFilteredRestaurants(mockRestaurants, lowerCaseQuery, {}),
    );

    expect(upperResult.current).toEqual(lowerResult.current);
  });
});
