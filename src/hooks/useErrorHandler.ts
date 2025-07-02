import { useState, useCallback } from 'react';
import { CustomError, parseError } from '@/utils/errors';

interface UseErrorHandlerOptions {
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: CustomError) => void;
}

interface UseErrorHandlerReturn {
  error: CustomError | null;
  isRetrying: boolean;
  retryCount: number;
  clearError: () => void;
  executeWithErrorHandling: <T>(
    fn: () => Promise<T>,
    context?: Record<string, unknown>
  ) => Promise<T | null>;
  retry: () => Promise<void>;
}

export const useErrorHandler = (options: UseErrorHandlerOptions = {}): UseErrorHandlerReturn => {
  const { maxRetries = 3, retryDelay = 1000, onError } = options;
  
  const [error, setError] = useState<CustomError | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [lastAttemptedFunction, setLastAttemptedFunction] = useState<{
    fn: () => Promise<unknown>;
    context?: Record<string, unknown>;
  } | null>(null);

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
    setLastAttemptedFunction(null);
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const executeWithErrorHandling = useCallback(
    async <T>(
      fn: () => Promise<T>,
      context?: Record<string, unknown>
    ): Promise<T | null> => {
      try {
        setError(null);
        setLastAttemptedFunction({ fn, context });
        const result = await fn();
        setRetryCount(0);
        return result;
      } catch (err) {
        const customError = parseError(err);
        
        if (context) {
          customError.context = { ...customError.context, ...context };
        }
        
        setError(customError);
        
        if (onError) {
          onError(customError);
        }
        
        return null;
      }
    },
    [onError]
  );

  const retry = useCallback(async (): Promise<void> => {
    if (!lastAttemptedFunction || !error?.retryable || retryCount >= maxRetries) {
      return;
    }

    setIsRetrying(true);
    
    try {
      // Add delay before retry
      await delay(retryDelay * Math.pow(2, retryCount)); // Exponential backoff
      
      setRetryCount(prev => prev + 1);
      await lastAttemptedFunction.fn();
      
      // Success - clear error state
      setError(null);
      setRetryCount(0);
      setLastAttemptedFunction(null);
    } catch (err) {
      const customError = parseError(err);
      
      if (lastAttemptedFunction.context) {
        customError.context = { ...customError.context, ...lastAttemptedFunction.context };
      }
      
      setError(customError);
      
      if (onError) {
        onError(customError);
      }
    } finally {
      setIsRetrying(false);
    }
  }, [lastAttemptedFunction, error, retryCount, maxRetries, retryDelay, onError]);

  return {
    error,
    isRetrying,
    retryCount,
    clearError,
    executeWithErrorHandling,
    retry,
  };
};
