import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import restaurantsReducer from '@/features/restaurants/restaurantsSlice';
import postcodesReducer from '@/features/postcodes/postcodesSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    postcodes: postcodesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
