import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import postcodesSaga, { fetchPostcodesWorker } from './postcodesSaga';
import fetchPostcodesApi from './postcodesSaga'; // Make sure fetchPostcodesApi is exported!
import {
  fetchPostcodesRequest,
  fetchPostcodesSuccess,
  Postcode,
} from './postcodesSlice';
import { mockPostcodes } from './mockPostcodes';

function fetchPostcodesApiSuccess(): Postcode[] {
  return [...mockPostcodes];
}

describe('postcodesSaga', () => {
  it('dispatches success when fetchPostcodesApi succeeds', () => {
    return expectSaga(fetchPostcodesWorker)
      .provide([[matchers.call.fn(fetchPostcodesApi), fetchPostcodesApiSuccess()]])
      .put(fetchPostcodesSuccess(mockPostcodes))
      .run();
  });

  it('watches for fetchPostcodesRequest', () => {
    return expectSaga(postcodesSaga).dispatch(fetchPostcodesRequest()).silentRun();
  });
});
