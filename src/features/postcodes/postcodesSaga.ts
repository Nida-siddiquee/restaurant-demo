import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPostcodesRequest,
  fetchPostcodesSuccess,
  fetchPostcodesFailure,
  Postcode,
} from './postcodesSlice';
import { mockPostcodes } from './mockPostcodes';

// Replace this with your real API call!
function fetchPostcodesApi(): Postcode[] {
  return [...mockPostcodes];
}

export function* fetchPostcodesWorker() {
  try {
    const postcodes: Postcode[] = yield call(fetchPostcodesApi);
    yield put(fetchPostcodesSuccess(postcodes));
  } catch (error: any) {
    yield put(fetchPostcodesFailure(error.message));
  }
}

export default function* postcodesSaga() {
  yield takeLatest(fetchPostcodesRequest.type, fetchPostcodesWorker);
}
