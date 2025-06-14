import { render, screen } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

jest.mock('@/assets/Loading.gif', () => 'mock-loading.gif');

describe('LoadingScreen', () => {
  it('renders the loading container', () => {
    render(<LoadingScreen />);
    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
  });

  it('displays the loading GIF', () => {
    render(<LoadingScreen />);
    const image = screen.getByAltText(/loading just eat/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-loading.gif');
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
});
