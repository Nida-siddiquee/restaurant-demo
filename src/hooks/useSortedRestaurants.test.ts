import { renderHook } from '@testing-library/react';
import { useSortedRestaurants } from './useSortedRestaurants';
import { SortOption } from '@/utils/sorting';
import { Restaurant } from '@/features/restaurants/types';

const mockRestaurants = [
  {
    id: '1',
    name: 'Restaurant A',
    uniqueName: 'restaurant-a',
    rating: { starRating: 4.5, count: 100, userRating: null },
    deliveryCost: 3.99,
    minimumDeliveryValue: 15,
    driveDistanceMeters: 2500,
  },
  {
    id: '2',
    name: 'Restaurant B',
    uniqueName: 'restaurant-b',
    rating: { starRating: 3.8, count: 50, userRating: null },
    deliveryCost: 2.49,
    minimumDeliveryValue: 10,
    driveDistanceMeters: 1500,
  },
  {
    id: '3',
    name: 'Restaurant C',
    uniqueName: 'restaurant-c',
    rating: { starRating: 4.9, count: 200, userRating: null },
    deliveryCost: 4.99,
    minimumDeliveryValue: 20,
    driveDistanceMeters: 3500,
  },
] as Restaurant[];

describe('useSortedRestaurants', () => {
  it('returns empty array when restaurants is undefined', () => {
    const { result } = renderHook(() => useSortedRestaurants(undefined, SortOption.NONE));
    expect(result.current).toEqual([]);
  });

  it('returns empty array when restaurants is empty', () => {
    const { result } = renderHook(() => useSortedRestaurants([], SortOption.NONE));
    expect(result.current).toEqual([]);
  });

  it('returns original order when sort option is NONE', () => {
    const { result } = renderHook(() => useSortedRestaurants(mockRestaurants, SortOption.NONE));
    expect(result.current).toEqual(mockRestaurants);
  });

  it('sorts by rating high to low', () => {
    const { result } = renderHook(() => 
      useSortedRestaurants(mockRestaurants, SortOption.RATING_HIGH_TO_LOW)
    );
    
    expect(result.current[0].id).toBe('3');         
    expect(result.current[1].id).toBe('1');         
    expect(result.current[2].id).toBe('2');         
  });

  it('sorts by delivery cost low to high', () => {
    const { result } = renderHook(() => 
      useSortedRestaurants(mockRestaurants, SortOption.DELIVERY_COST_LOW_TO_HIGH)
    );
    
    expect(result.current[0].id).toBe('2'); 
    expect(result.current[1].id).toBe('1'); 
    expect(result.current[2].id).toBe('3'); 
  });

  it('sorts by minimum order low to high', () => {
    const { result } = renderHook(() => 
      useSortedRestaurants(mockRestaurants, SortOption.MIN_ORDER_LOW_TO_HIGH)
    );
    
    expect(result.current[0].id).toBe('2');     expect(result.current[1].id).toBe('1');     expect(result.current[2].id).toBe('3');   });

  it('sorts by distance near to far', () => {
    const { result } = renderHook(() => 
      useSortedRestaurants(mockRestaurants, SortOption.DISTANCE_NEAR_TO_FAR)
    );
    
    expect(result.current[0].id).toBe('2'); 
    expect(result.current[1].id).toBe('1'); 
    expect(result.current[2].id).toBe('3'); 
  });

  it('handles missing data fields gracefully', () => {
    const incompleteRestaurants = [
      {
        id: '1',
        name: 'Restaurant A',
        uniqueName: 'restaurant-a',
        deliveryCost: 3.99,
        minimumDeliveryValue: 15,
        driveDistanceMeters: 2500,
      },
      {
        id: '2',
        name: 'Restaurant B',
        uniqueName: 'restaurant-b',
        rating: { starRating: 3.8, count: 50, userRating: null },
        minimumDeliveryValue: 10,
        driveDistanceMeters: 1500,
      },
    ] as unknown as Restaurant[];

    const { result } = renderHook(() => 
      useSortedRestaurants(incompleteRestaurants, SortOption.RATING_HIGH_TO_LOW)
    );
    
    expect(result.current[0].id).toBe('2');
    expect(result.current[1].id).toBe('1');
  });
});
