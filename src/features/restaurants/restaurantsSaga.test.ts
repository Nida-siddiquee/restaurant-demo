import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { fetchRestaurantsSaga } from './restaurantsSaga'; // export fetchRestaurantsSaga separately
import {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
} from './restaurantsSlice';
import { mockRestaurantsResponse } from './mockRestaurantsResponse'; // Use your actual mock file

const postcode = 'CF11';

describe('fetchRestaurantsSaga', () => {
  it('dispatches success when API succeeds', () => {
    return expectSaga(fetchRestaurantsSaga, fetchRestaurantsRequest(postcode))
      .provide([
        [matchers.call.fn(require('@/services/api').fetchRestaurantsApi), mockRestaurantsResponse],
      ])
      .put(fetchRestaurantsSuccess(mockRestaurantsResponse))
      .run();
  });

  it('dispatches failure when API throws', () => {
    const error = new Error('API error');
    return expectSaga(fetchRestaurantsSaga, fetchRestaurantsRequest(postcode))
      .provide([
        [matchers.call.fn(require('@/services/api').fetchRestaurantsApi), Promise.reject(error)],
      ])
      .put(fetchRestaurantsFailure('API error'))
      .run();
  });
});
