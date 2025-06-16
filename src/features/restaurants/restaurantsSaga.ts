import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRestaurantsApi } from '@/services/api';
import {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
} from './restaurantsSlice';
import type { RestaurantsResponse } from './types';

export function* fetchRestaurantsSaga(action: PayloadAction<string>) {
  try {
    const response: RestaurantsResponse = yield call(fetchRestaurantsApi, action.payload);
    yield put(fetchRestaurantsSuccess(response));
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch restaurants';
    yield put(fetchRestaurantsFailure(errorMessage));
  }
}

export default function* restaurantsRootSaga() {
  yield takeLatest(fetchRestaurantsRequest.type, fetchRestaurantsSaga);
}
