import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Restaurant, RestaurantsResponse } from './types';
import { SortOption } from '@/utils/sorting';

export const fetchRestaurantsRequest = createAction<string>('restaurants/fetchRestaurantsRequest');
export const fetchRestaurantsSuccess = createAction<RestaurantsResponse>(
  'restaurants/fetchRestaurantsSuccess',
);
export const fetchRestaurantsFailure = createAction<string>('restaurants/fetchRestaurantsFailure');
export const setSearchQuery = createAction<string>('restaurants/setSearchQuery');
export const setCurrentPage = createAction<number>('restaurants/setCurrentPage');
export const selectRestaurant = createAction<string>('restaurants/selectRestaurant');
export const setActiveFilters = createAction<{ [filterId: string]: boolean }>(
  'restaurants/setActiveFilters',
);
export const resetFilters = createAction('restaurants/resetFilters');
export const setSortOption = createAction<SortOption>('restaurants/setSortOption');

export interface RestaurantsState {
  data: RestaurantsResponse | null;
  loading: boolean;
  error: string | null;
  errorType?: string;
  selectedId: string | null;
  selected: Restaurant | null;
  searchQuery: string;
  currentPage: number;
  activeFilters: { [filterId: string]: boolean };
  sortOption: SortOption;
}

const initialState: RestaurantsState = {
  data: null,
  loading: false,
  error: null,
  errorType: undefined,
  selectedId: null,
  selected: null,
  searchQuery: '',
  currentPage: 1,
  activeFilters: {},
  sortOption: SortOption.NONE,
};

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    selectRestaurant: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
      const restaurant = state.data?.restaurants.find(r => r.id === action.payload);
      if (restaurant) {
        state.selected = restaurant;
      } else {
        state.selected = null;
        state.loading = false;
        state.error = 'Error: Restaurant not found';
      }
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    toggleFilter: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.activeFilters[id] = !state.activeFilters[id];
    },
    resetFilters: state => {
      state.activeFilters = {};
      state.currentPage = 1;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchRestaurantsRequest, state => {
        state.loading = true;
        state.error = null;
        state.errorType = undefined;
        state.data = null;
      })
      .addCase(fetchRestaurantsSuccess, (state, action: PayloadAction<RestaurantsResponse>) => {
        state.loading = false;
        state.data = action.payload;
        state.activeFilters = {};

        if (state.selectedId) {
          state.selected = state.data.restaurants.find(r => r.id === state.selectedId) ?? null;
        }
      })
      .addCase(fetchRestaurantsFailure, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(
        setActiveFilters,
        (state, action: PayloadAction<{ [filterId: string]: boolean }>) => {
          state.activeFilters = action.payload;
          state.currentPage = 1;
        },
      ),
});

export default restaurantsSlice.reducer;
