import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { ErrorProviderProps } from './types';

const ErrorProvider: React.FC<ErrorProviderProps> = ({ 
  children, 
  fallback,
  onError 
}) => {
  return (
    <ErrorBoundary
      fallbackComponent={fallback}
      onError={onError ? (error) => onError(error) : undefined}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorProvider;
