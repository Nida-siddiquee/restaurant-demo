import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage
import restaurantsReducer from '@/features/restaurants/restaurantsSlice';
import postcodesReducer from '@/features/postcodes/postcodesSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  restaurants: restaurantsReducer,
  postcodes: postcodesReducer,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['restaurants', 'postcodes'],
};
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);