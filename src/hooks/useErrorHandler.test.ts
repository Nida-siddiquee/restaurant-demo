import { renderHook, act } from '@testing-library/react';
import { useErrorHandler } from './useErrorHandler';
import { createNetworkError } from '@/utils/errors';

describe('useErrorHandler', () => {
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useErrorHandler());

    expect(result.current.error).toBeNull();
    expect(result.current.isRetrying).toBe(false);
    expect(result.current.retryCount).toBe(0);
  });

  it('executes function successfully', async () => {
    const { result } = renderHook(() => useErrorHandler());
    const mockFn = jest.fn().mockResolvedValue('success');

    let resultValue;
    await act(async () => {
      resultValue = await result.current.executeWithErrorHandling(mockFn);
    });

    expect(resultValue).toBe('success');
    expect(result.current.error).toBeNull();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('handles errors correctly', async () => {
    const { result } = renderHook(() => useErrorHandler({ onError: mockOnError }));
    const mockError = new Error('Test error');
    const mockFn = jest.fn().mockRejectedValue(mockError);

    let resultValue;
    await act(async () => {
      resultValue = await result.current.executeWithErrorHandling(mockFn);
    });

    expect(resultValue).toBeNull();
    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe('Test error');
    expect(mockOnError).toHaveBeenCalledTimes(1);
  });

  it('adds context to errors', async () => {
    const { result } = renderHook(() => useErrorHandler());
    const mockFn = jest.fn().mockRejectedValue(new Error('Test error'));
    const context = { action: 'test', id: '123' };

    await act(async () => {
      await result.current.executeWithErrorHandling(mockFn, context);
    });

    expect(result.current.error?.context).toEqual(expect.objectContaining(context));
  });

  it('clears error correctly', async () => {
    const { result } = renderHook(() => useErrorHandler());
    const mockFn = jest.fn().mockRejectedValue(new Error('Test error'));

    await act(async () => {
      await result.current.executeWithErrorHandling(mockFn);
    });

    expect(result.current.error).toBeTruthy();

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.retryCount).toBe(0);
  });

  it('retries for retryable errors', async () => {
    const { result } = renderHook(() => useErrorHandler({ maxRetries: 2 }));
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(createNetworkError('Network error'))
      .mockResolvedValueOnce('success');

    await act(async () => {
      await result.current.executeWithErrorHandling(mockFn);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.retryCount).toBe(0);

    await act(async () => {
      const retryPromise = result.current.retry();
      jest.advanceTimersByTime(1000);
      await retryPromise;
    });

    expect(result.current.error).toBeNull();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('does not retry non-retryable errors', async () => {
    const { result } = renderHook(() => useErrorHandler());
    const nonRetryableError = createNetworkError('Network error');
    nonRetryableError.retryable = false;

    const mockFn = jest.fn().mockRejectedValue(nonRetryableError);

    await act(async () => {
      await result.current.executeWithErrorHandling(mockFn);
    });

    await act(async () => {
      await result.current.retry();
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('respects maxRetries limit', async () => {
    const { result } = renderHook(() => useErrorHandler({ maxRetries: 1 }));
    const mockFn = jest.fn().mockRejectedValue(createNetworkError('Network error'));

    await act(async () => {
      await result.current.executeWithErrorHandling(mockFn);
    });

    await act(async () => {
      const retryPromise = result.current.retry();
      jest.advanceTimersByTime(1000);
      await retryPromise;
    });

    expect(result.current.retryCount).toBe(1);

    await act(async () => {
      await result.current.retry();
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
