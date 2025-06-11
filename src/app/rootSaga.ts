import { all, fork } from 'redux-saga/effects';
import restaurantsSaga from '@/features/restaurants/restaurantsSaga';
import postcodesSaga from '@/features/postcodes/postcodesSaga';

export default function* rootSaga() {
  yield all([fork(restaurantsSaga), fork(postcodesSaga)]);
}
