import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { LayoutFilterItem, Restaurant, RestaurantsResponse } from './types';

export const fetchRestaurantsRequest = createAction<string>('restaurants/fetchRestaurantsRequest');
export const fetchRestaurantsSuccess = createAction<RestaurantsResponse>(
  'restaurants/fetchRestaurantsSuccess',
);
export const fetchRestaurantsFailure = createAction<string>('restaurants/fetchRestaurantsFailure');
export const setSearchQuery = createAction<string>('restaurants/setSearchQuery');
export const setCurrentPage = createAction<number>('restaurants/setCurrentPage'); 
export const selectRestaurant = createAction<string>('restaurants/selectRestaurant');
export const setActiveFilters = createAction<{ [filterId: string]: boolean }>('restaurants/setActiveFilters');

interface RestaurantsState {
  data: RestaurantsResponse | null;
  loading: boolean;
  error: string | null;
  selectedId: string | null;
  selected: Restaurant | null;
  searchQuery: string;
  currentPage: number;
    activeFilters: { [filterId: string]: boolean };  // <--- NEW

}

const initialState: RestaurantsState = {
  data: null,
  loading: false,
  error: null,
  selectedId: null,
  selected: null,
  searchQuery: '',
  currentPage: 1,
  activeFilters: {},
};

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    /* select a single restaurant */
    selectRestaurant: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
      state.selected = state.data?.restaurants.find(r => r.id === action.payload) ?? null;
    },

    /* search & pagination */
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
},
  extraReducers: builder =>
    builder
      /* handle fetch lifecycle */
      .addCase(fetchRestaurantsRequest, state => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchRestaurantsSuccess, (state, action: PayloadAction<RestaurantsResponse>) => {
        state.loading = false;
        state.data = action.payload;
        if (state.selectedId) {
          state.selected = state.data.restaurants.find(r => r.id === state.selectedId) ?? null;
        }
      })
      .addCase(fetchRestaurantsFailure, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(setActiveFilters, (state, action: PayloadAction<{ [filterId: string]: boolean }>) => {
        state.activeFilters = action.payload;
         state.currentPage = 1;
      }),
});

export default restaurantsSlice.reducer;
