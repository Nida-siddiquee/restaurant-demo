import { render, screen } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

jest.mock('@/assets/Loading.gif', () => 'mock-loading.gif');

describe('LoadingScreen', () => {
  it('renders the loading container', () => {
    render(<LoadingScreen />);
    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
  });

  it('displays the loading GIF with proper accessibility', () => {
    render(<LoadingScreen />);
    const image = screen.getByRole('presentation');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-loading.gif');
    expect(image).toHaveAttribute('alt', 'Loading Just Eat');
  });

  it('shows the loading message', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByText(/your delicious options/i)).toBeInTheDocument();
  });

  it('has a styled span in the message', () => {
    render(<LoadingScreen />);
    const span = screen.getByText(/your delicious options/i);
    expect(span.tagName).toBe('SPAN');
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingScreen />);

    const container = screen.getByTestId('loading-container');
    expect(container).toHaveAttribute('role', 'status');
    expect(container).toHaveAttribute('aria-live', 'polite');
    expect(container).toHaveAttribute('aria-label', 'Loading restaurants');
  });
});
