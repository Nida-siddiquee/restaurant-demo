// features/restaurants/restaurantsSlice.ts
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  Restaurant, RestaurantsResponse } from './types';

export const fetchRestaurantsRequest = createAction< string >('restaurants/fetchRestaurantsRequest');
export const fetchRestaurantsSuccess = createAction<RestaurantsResponse>('restaurants/fetchRestaurantsSuccess');
export const fetchRestaurantsFailure = createAction<string>('restaurants/fetchRestaurantsFailure');

export const selectRestaurant = createAction<string>('restaurants/selectRestaurant')

interface RestaurantsState {
  data: RestaurantsResponse | null;
  loading: boolean;
  error: string | null;
  selectedId: string | null
  selected: Restaurant | null
}

const initialState: RestaurantsState = {
  data: null,
  loading: false,
  error: null,
  selectedId: null,
  selected: null,
};

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    // no reducers here, we’re using the actions above in the saga
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRestaurantsRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantsSuccess, (state, action: PayloadAction<RestaurantsResponse>) => {
        state.loading = false;
        state.data = action.payload;
        // if (state.selectedId) {
        //   state.selected = state.data.find(r => r.id === state.selectedId) || null
        // }
      })
      .addCase(fetchRestaurantsFailure, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(selectRestaurant, (state, action: PayloadAction<string>) => {
        state.selectedId = action.payload
        // state.selected = state.data.find(r => r.id === action.payload) || null
      }),
});

export default restaurantsSlice.reducer;
