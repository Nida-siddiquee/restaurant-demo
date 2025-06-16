import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { fetchRestaurantsSaga } from './restaurantsSaga'; 
import {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
} from './restaurantsSlice';
import { mockRestaurantsResponse } from './mockRestaurantsResponse'; 
import * as api from '@/services/api';

const postcode = 'CF11';

describe('fetchRestaurantsSaga', () => {
  it('dispatches success when API succeeds', () => {
    return expectSaga(fetchRestaurantsSaga, fetchRestaurantsRequest(postcode))
      .provide([[matchers.call.fn(api.fetchRestaurantsApi), mockRestaurantsResponse]])
      .put(fetchRestaurantsSuccess(mockRestaurantsResponse))
      .run();
  });

  it('dispatches failure when API throws', () => {
    const error = new Error('API error');
    return expectSaga(fetchRestaurantsSaga, fetchRestaurantsRequest(postcode))
      .provide([[matchers.call.fn(api.fetchRestaurantsApi), Promise.reject(error)]])
      .put(fetchRestaurantsFailure('API error'))
      .run();
  });
});
