import { sortRestaurants, SortOption } from './sorting';
import { Restaurant } from '@/features/restaurants/types';

// Mock restaurants data with partial data to match the required fields for sorting
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

describe('sortRestaurants', () => {
  it('returns a new array without modifying the original', () => {
    const originalOrder = [...mockRestaurants];
    const result = sortRestaurants(mockRestaurants, SortOption.RATING_HIGH_TO_LOW);
    
    expect(result).not.toBe(mockRestaurants);
    
    expect(mockRestaurants).toEqual(originalOrder);
  });

  it('returns original order when sort option is NONE', () => {
    const result = sortRestaurants(mockRestaurants, SortOption.NONE);
    expect(result).toEqual(mockRestaurants);
  });

  it('sorts by rating high to low', () => {
    const result = sortRestaurants(mockRestaurants, SortOption.RATING_HIGH_TO_LOW);
    
    expect(result[0].id).toBe('3'); 
    expect(result[1].id).toBe('1'); 
    expect(result[2].id).toBe('2'); 
  });

  it('sorts by delivery cost low to high', () => {
    const result = sortRestaurants(mockRestaurants, SortOption.DELIVERY_COST_LOW_TO_HIGH);
    
    expect(result[0].id).toBe('2'); 
    expect(result[1].id).toBe('1'); 
    expect(result[2].id).toBe('3'); 
  });

  it('sorts by minimum order low to high', () => {
    const result = sortRestaurants(mockRestaurants, SortOption.MIN_ORDER_LOW_TO_HIGH);
    
    expect(result[0].id).toBe('2'); 
    expect(result[1].id).toBe('1'); 
    expect(result[2].id).toBe('3'); 
  });

  it('sorts by distance near to far', () => {
    const result = sortRestaurants(mockRestaurants, SortOption.DISTANCE_NEAR_TO_FAR);
    
    expect(result[0].id).toBe('2'); 
    expect(result[1].id).toBe('1'); 
    expect(result[2].id).toBe('3'); 
  });

  it('handles null or undefined values gracefully', () => {
    const incompleteRestaurants = [
      {
        id: '1',
        name: 'Restaurant A',
        uniqueName: 'restaurant-a',
        deliveryCost: null,
        minimumDeliveryValue: undefined, 
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
    ] as unknown as Restaurant[];

    const ratingResult = sortRestaurants(incompleteRestaurants, SortOption.RATING_HIGH_TO_LOW);
    expect(ratingResult[0].id).toBe('2');
    
    const deliveryResult = sortRestaurants(incompleteRestaurants, SortOption.DELIVERY_COST_LOW_TO_HIGH);
    expect(deliveryResult[0].id).toBe('1');
    
    const minOrderResult = sortRestaurants(incompleteRestaurants, SortOption.MIN_ORDER_LOW_TO_HIGH);
    expect(minOrderResult[0].id).toBe('1');
  });

  it('handles empty array gracefully', () => {
    const result = sortRestaurants([], SortOption.RATING_HIGH_TO_LOW);
    expect(result).toEqual([]);
  });
});
