import React, { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { CustomError } from '@/utils/errors';

interface ErrorProviderProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: CustomError; onRetry: () => void }>;
  onError?: (error: CustomError) => void;
}

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
