import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRestaurantsApi } from '@/services/api';
import { parseError } from '@/utils/errors';
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
    const customError = parseError(err);
    yield put(fetchRestaurantsFailure(customError.message));
  }
}

export default function* restaurantsRootSaga() {
  yield takeLatest(fetchRestaurantsRequest.type, fetchRestaurantsSaga);
}
