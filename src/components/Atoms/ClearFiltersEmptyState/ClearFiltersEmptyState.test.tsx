import { render, screen, fireEvent } from '@testing-library/react';
import ClearFiltersEmptyState from './ClearFiltersEmptyState';

describe('ClearFiltersEmptyState', () => {
  it('renders without crashing', () => {
    render(<ClearFiltersEmptyState onClear={jest.fn()} />);
    expect(screen.getByTestId('clear-filters-icon')).toBeInTheDocument();
    expect(screen.getByTestId('clear-filters-title')).toHaveTextContent('Clear your filters');
    expect(screen.getByTestId('clear-filters-message')).toBeInTheDocument();
    expect(screen.getByTestId('clear-filters-button')).toBeInTheDocument();
  });

  it('shows correct icon src and alt', () => {
    render(<ClearFiltersEmptyState onClear={jest.fn()} />);
    const icon = screen.getByTestId('clear-filters-icon');
    expect(icon).toHaveAttribute('src', 'pin-mock.svg');
    expect(icon).toHaveAttribute('alt', 'Filter icon');
  });

  it('calls onClear when button is clicked', () => {
    const onClear = jest.fn();
    render(<ClearFiltersEmptyState onClear={onClear} />);
    fireEvent.click(screen.getByTestId('clear-filters-button'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
