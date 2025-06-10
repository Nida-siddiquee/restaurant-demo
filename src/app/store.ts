// src/app/store.ts
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
import storage from 'redux-persist/lib/storage'; // -> localStorage

import restaurantsReducer from '@/features/restaurants/restaurantsSlice';
import postcodesReducer   from '@/features/postcodes/postcodesSlice';
import rootSaga           from './rootSaga';

// 1️⃣ Combine slices as usual
const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  postcodes:   postcodesReducer,
});

// 2️⃣ Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['postcodes', 'restaurants'], // optional
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3️⃣ Saga middleware
const sagaMiddleware = createSagaMiddleware();

// 4️⃣ Configure store
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

// 5️⃣ Run root saga
sagaMiddleware.run(rootSaga);

// 6️⃣ Persistor (used in <PersistGate>)
export const persistor = persistStore(store);

// 7️⃣ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;