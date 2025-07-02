import reducer, {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
  setSearchQuery,
  setCurrentPage,
  selectRestaurant,
  resetFilters,
  setActiveFilters,
} from './restaurantsSlice';
import { mockRestaurantsResponse } from './mockRestaurantsResponse';
import { SortOption } from '@/utils/sorting';

describe('restaurantsSlice', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null,
    selectedId: null,
    selected: null,
    searchQuery: '',
    currentPage: 1,
    activeFilters: {},
    sortOption: SortOption.NONE,
  };

  it('handles fetchRestaurantsRequest', () => {
    const state = reducer(initialState, fetchRestaurantsRequest('CF11'));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.data).toBeNull();
  });

  it('handles fetchRestaurantsSuccess', () => {
    const state = reducer(
      { ...initialState, loading: true },
      fetchRestaurantsSuccess(mockRestaurantsResponse),
    );
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockRestaurantsResponse);
    expect(state.selected).toBeNull();
  });

  it('handles fetchRestaurantsFailure', () => {
    const state = reducer({ ...initialState, loading: true }, fetchRestaurantsFailure('Error'));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('handles setSearchQuery', () => {
    const state = reducer(initialState, setSearchQuery('pizza'));
    expect(state.searchQuery).toBe('pizza');
    expect(state.currentPage).toBe(1);
  });

  it('handles setCurrentPage', () => {
    const state = reducer(initialState, setCurrentPage(3));
    expect(state.currentPage).toBe(3);
  });

  it('handles selectRestaurant for existing id', () => {
    const restaurantId = mockRestaurantsResponse.restaurants[0].id;
    const state = reducer(
      { ...initialState, data: mockRestaurantsResponse },
      selectRestaurant(restaurantId),
    );
    expect(state.selectedId).toBe(restaurantId);
    expect(state.selected).toEqual(mockRestaurantsResponse.restaurants[0]);
  });

  it('handles selectRestaurant for missing id', () => {
    const state = reducer(
      { ...initialState, data: mockRestaurantsResponse },
      selectRestaurant('missing-id'),
    );
    expect(state.selectedId).toBe('missing-id');
    expect(state.selected).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error: Restaurant not found');
  });

  it('handles resetFilters', () => {
    const state = reducer(
      {
        ...initialState,
        activeFilters: { foo: true },
        currentPage: 5,
      },
      resetFilters(),
    );
    expect(state.activeFilters).toEqual({});
    expect(state.currentPage).toBe(1);
  });

  it('handles setActiveFilters', () => {
    const filters = { foo: true, bar: false };
    const state = reducer({ ...initialState, currentPage: 2 }, setActiveFilters(filters));
    expect(state.activeFilters).toEqual(filters);
    expect(state.currentPage).toBe(1);
  });
});
