import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { createNetworkError } from '@/utils/errors';

const ThrowError: React.FC<{ shouldThrow?: boolean; message?: string }> = ({
  shouldThrow = false,
  message = 'Test error',
}) => {
  if (shouldThrow) {
    throw new Error(message);
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('catches and displays errors', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} message="Component crashed" />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
    expect(screen.getByText(/Component crashed/)).toBeInTheDocument();
  });

  it('calls onError handler when error occurs', () => {
    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError shouldThrow={true} message="Test error" />
      </ErrorBoundary>,
    );

    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Test error' }),
      expect.objectContaining({ componentStack: expect.any(String) }),
    );
  });

  it('uses custom fallback component when provided', () => {
    const CustomFallback = ({ error }: { error: any }) => <div>Custom error: {error.message}</div>;

    render(
      <ErrorBoundary fallbackComponent={CustomFallback}>
        <ThrowError shouldThrow={true} message="Custom error message" />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Custom error: Custom error message')).toBeInTheDocument();
  });

  it('resets error state when resetKeys change', () => {
    const { rerender } = render(
      <ErrorBoundary resetKeys={['key1']}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();

    rerender(
      <ErrorBoundary resetKeys={['key2']}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('handles CustomError instances correctly', () => {
    const CustomErrorComponent = () => {
      throw createNetworkError('Network connection failed');
    };

    render(
      <ErrorBoundary>
        <CustomErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Connection Problem')).toBeInTheDocument();
    expect(screen.getByText(/check your internet connection/)).toBeInTheDocument();
  });
});
