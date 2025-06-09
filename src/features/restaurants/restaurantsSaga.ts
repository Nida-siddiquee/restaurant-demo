/* eslint-disable @typescript-eslint/no-explicit-any */
// features/restaurants/restaurantsSaga.ts
import type { PayloadAction }    from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchRestaurantsApi }   from '@/services/api'
import {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
} from './restaurantsSlice'
import type { RestaurantsResponse } from './types'

function* fetchRestaurantsSaga(action: PayloadAction<string>) {
  try {
    console.log('Fetching restaurants for postcode:', action.payload)
    const response: RestaurantsResponse = yield call(fetchRestaurantsApi, action.payload)
    yield put(fetchRestaurantsSuccess(response))
  } catch (err: any) {
    yield put(fetchRestaurantsFailure(err.message || 'Failed to fetch restaurants'))
  }
}

export default function* restaurantsRootSaga() {
  yield takeLatest(fetchRestaurantsRequest.type, fetchRestaurantsSaga)
}
