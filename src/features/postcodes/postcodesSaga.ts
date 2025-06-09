// src/features/postcodes/postcodesSaga.ts

import {put, takeLatest } from 'redux-saga/effects';
import { fetchPostcodesSuccess, fetchPostcodesFailure, fetchPostcodesRequest } from './postcodesSlice';
import { mockPostcodes } from '@/features/postcodes/mockPostcodes';

function* fetchPostcodesSaga() {
  try {
    yield put(fetchPostcodesSuccess(mockPostcodes));
  } catch (error: unknown) {
const message =
    error instanceof Error
      ? error.message
      : 'Failed to fetch postcodes';

  yield put(fetchPostcodesFailure(message));
}  }


export default function* postcodesRootSaga() {
  yield takeLatest(fetchPostcodesRequest.type, fetchPostcodesSaga);
}
