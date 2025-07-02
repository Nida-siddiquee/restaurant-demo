import { render, screen, fireEvent } from '@testing-library/react';
import ErrorDisplay from './ErrorDisplay';
import { createNetworkError, createApiError, createNotFoundError } from '@/utils/errors';

describe('ErrorDisplay', () => {
  const mockOnRetry = jest.fn();
  const mockOnGoHome = jest.fn();
  const mockOnReload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders network error correctly', () => {
    const error = createNetworkError('Connection failed');
    render(<ErrorDisplay error={error} />);

    expect(screen.getByText('Connection Problem')).toBeInTheDocument();
    expect(screen.getByText(/check your internet connection/i)).toBeInTheDocument();
    expect(screen.getByText('🌐')).toBeInTheDocument();
  });

  it('renders API error correctly', () => {
    const error = createApiError(500, 'Server error');
    render(<ErrorDisplay error={error} />);

    expect(screen.getByText('Service Unavailable')).toBeInTheDocument();
    expect(screen.getByText(/temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('renders not found error correctly', () => {
    const error = createNotFoundError('Restaurant');
    render(<ErrorDisplay error={error} />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText(/doesn't exist/i)).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('shows retry button for retryable errors', () => {
    const error = createNetworkError('Connection failed');
    render(<ErrorDisplay error={error} onRetry={mockOnRetry} />);

    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('does not show retry button for non-retryable errors', () => {
    const error = createNotFoundError('Restaurant');
    render(<ErrorDisplay error={error} onRetry={mockOnRetry} />);

    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('shows all action buttons when provided', () => {
    const error = createNetworkError('Connection failed');
    render(
      <ErrorDisplay
        error={error}
        onRetry={mockOnRetry}
        onGoHome={mockOnGoHome}
        onReload={mockOnReload}
      />,
    );

    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });

  it('calls correct handlers when buttons are clicked', () => {
    const error = createNetworkError('Connection failed');
    render(
      <ErrorDisplay
        error={error}
        onRetry={mockOnRetry}
        onGoHome={mockOnGoHome}
        onReload={mockOnReload}
      />,
    );

    fireEvent.click(screen.getByText('Try Again'));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Go Home'));
    expect(mockOnGoHome).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Reload Page'));
    expect(mockOnReload).toHaveBeenCalledTimes(1);
  });

  it('shows technical details when showDetails is true', () => {
    const error = createApiError(500, 'Server error');
    render(<ErrorDisplay error={error} showDetails={true} />);

    expect(screen.getByText('Technical Details')).toBeInTheDocument();
  });

  it('does not show technical details when showDetails is false', () => {
    const error = createApiError(500, 'Server error');
    render(<ErrorDisplay error={error} showDetails={false} />);

    expect(screen.queryByText('Technical Details')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const error = createNetworkError('Connection failed');
    render(<ErrorDisplay error={error} onRetry={mockOnRetry} />);

    const container = screen.getByRole('alert');
    expect(container).toHaveAttribute('aria-live', 'polite');

    const retryButton = screen.getByLabelText('Retry the last action');
    expect(retryButton).toBeInTheDocument();
  });
});
