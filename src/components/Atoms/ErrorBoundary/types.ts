export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number | boolean | undefined | null>;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface ErrorProviderProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: import('@/utils/errors').CustomError; onRetry: () => void }>;
  onError?: (error: import('@/utils/errors').CustomError) => void;
}
