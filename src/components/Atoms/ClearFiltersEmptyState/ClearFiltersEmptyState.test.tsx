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

  it('shows correct icon src and accessibility attributes', () => {
    render(<ClearFiltersEmptyState onClear={jest.fn()} />);
    const icon = screen.getByTestId('clear-filters-icon');
    expect(icon).toHaveAttribute('src', 'pin-mock.svg');
    expect(icon).toHaveAttribute('alt', '');
    expect(icon).toHaveAttribute('role', 'presentation');
  });

  it('calls onClear when button is clicked', () => {
    const onClear = jest.fn();
    render(<ClearFiltersEmptyState onClear={onClear} />);
    fireEvent.click(screen.getByTestId('clear-filters-button'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<ClearFiltersEmptyState onClear={jest.fn()} />);

    const wrapper = screen.getByRole('status');
    expect(wrapper).toHaveAttribute('aria-live', 'polite');
    expect(wrapper).toHaveAttribute('aria-labelledby', 'clear-filters-title');
    expect(wrapper).toHaveAttribute('aria-describedby', 'clear-filters-message');

    const title = screen.getByTestId('clear-filters-title');
    expect(title).toHaveAttribute('id', 'clear-filters-title');

    const message = screen.getByTestId('clear-filters-message');
    expect(message).toHaveAttribute('id', 'clear-filters-message');
  });
});
