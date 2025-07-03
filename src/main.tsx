import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store.ts';
import { AppRoutes } from './routes.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './components/Atoms/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
