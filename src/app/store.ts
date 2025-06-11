import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware      from 'redux-saga';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import restaurantsReducer from '@/features/restaurants/restaurantsSlice';
import postcodesReducer   from '@/features/postcodes/postcodesSlice';
import rootSaga           from './rootSaga';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  postcodes:   postcodesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;