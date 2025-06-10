import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Restaurant, RestaurantsResponse } from './types';

export const fetchRestaurantsRequest = createAction<string>(
  'restaurants/fetchRestaurantsRequest'
);
export const fetchRestaurantsSuccess = createAction<RestaurantsResponse>(
  'restaurants/fetchRestaurantsSuccess'
);
export const fetchRestaurantsFailure = createAction<string>(
  'restaurants/fetchRestaurantsFailure'
);

export const setSearchQuery   = createAction<string>('restaurants/setSearchQuery');
export const setCurrentPage   = createAction<number>('restaurants/setCurrentPage'); // NEW
export const selectRestaurant = createAction<string>('restaurants/selectRestaurant');

interface RestaurantsState {
  data:          RestaurantsResponse | null;
  loading:       boolean;
  error:         string | null;
  selectedId:    string | null;
  selected:      Restaurant | null;
  searchQuery:   string;
  currentPage:   number;
}

const initialState: RestaurantsState = {
  data: null,
  loading: false,
  error: null,
  selectedId: null,
  selected: null,
  searchQuery: '',
  currentPage: 1,
};

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    /* select a single restaurant */
    selectRestaurant: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
      state.selected =
        state.data?.restaurants.find(r => r.id === action.payload) ?? null;
    },

    /* search & pagination */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // reset page on new search
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  }, 
  extraReducers: builder =>
    builder
      /* handle fetch lifecycle */
      .addCase(fetchRestaurantsRequest, state => {
        state.loading = true;
        state.error   = null;
        state.data    = null;
      })
      .addCase(fetchRestaurantsSuccess, (state, action: PayloadAction<RestaurantsResponse>) => {
        state.loading = false;
        state.data    = action.payload;
        if (state.selectedId) {
          state.selected =
            state.data.restaurants.find(r => r.id === state.selectedId) ?? null;
        }
      })
      .addCase(fetchRestaurantsFailure, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error   = action.payload;
      })

 
});

export default restaurantsSlice.reducer;