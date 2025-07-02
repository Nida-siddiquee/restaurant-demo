import { useState, useCallback } from 'react';
import { CustomError, parseError } from '@/utils/errors';

interface UseErrorBoundaryReturn {
  error: CustomError | null;
  resetError: () => void;
  captureError: (error: unknown) => void;
}

export const useErrorBoundary = (): UseErrorBoundaryReturn => {
  const [error, setError] = useState<CustomError | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error: unknown) => {
    const customError = parseError(error);
    setError(customError);
  }, []);

  return {
    error,
    resetError,
    captureError,
  };
};


export const useThrowAsyncError = () => {
  const [, setState] = useState();
  
  return useCallback((error: unknown) => {
    setState(() => {
      throw error;
    });
  }, []);
};
