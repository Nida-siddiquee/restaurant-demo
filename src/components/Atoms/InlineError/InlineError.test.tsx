import { render, screen, fireEvent } from '@testing-library/react';
import InlineError from './InlineError';
import { createNetworkError, createValidationError } from '@/utils/errors';

describe('InlineError', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message correctly', () => {
    const error = createNetworkError('Connection failed');
    render(<InlineError error={error} />);

    expect(screen.getByText('Connection failed')).toBeInTheDocument();
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('shows retry button for retryable errors', () => {
    const error = createNetworkError('Connection failed');
    render(<InlineError error={error} onRetry={mockOnRetry} />);

    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('does not show retry button for non-retryable errors', () => {
    const error = createValidationError('Invalid input');
    render(<InlineError error={error} onRetry={mockOnRetry} />);

    expect(screen.queryByText('Retry')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const error = createNetworkError('Connection failed');
    render(<InlineError error={error} onRetry={mockOnRetry} />);

    const container = screen.getByRole('alert');
    expect(container).toHaveAttribute('aria-live', 'polite');

    const retryButton = screen.getByLabelText('Retry the failed action');
    expect(retryButton).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const error = createNetworkError('Connection failed');
    render(<InlineError error={error} className="custom-class" />);

    const container = screen.getByRole('alert');
    expect(container).toHaveClass('custom-class');
  });
});
