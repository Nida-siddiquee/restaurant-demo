import { render, screen, fireEvent } from '@testing-library/react';
import MobileFilterBar from './MobileFilterBar';

describe('MobileFilterBar', () => {
  const defaultProps = {
    hasActiveFilters: false,
    onFilterClick: jest.fn(),
    onClearFilters: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the filter button', () => {
    render(<MobileFilterBar {...defaultProps} />);
    
    const filterButton = screen.getByRole('button', { name: /open filters/i });
    expect(filterButton).toBeInTheDocument();
  });

  it('renders the filter icon', () => {
    render(<MobileFilterBar {...defaultProps} />);
    
    const filterIcon = screen.getByRole('presentation');
    expect(filterIcon).toBeInTheDocument();
    expect(filterIcon).toHaveAttribute('src', 'pin-mock.svg');
  });

  it('calls onFilterClick when filter button is clicked', () => {
    render(<MobileFilterBar {...defaultProps} />);
    
    const filterButton = screen.getByRole('button', { name: /open filters/i });
    fireEvent.click(filterButton);
    
    expect(defaultProps.onFilterClick).toHaveBeenCalledTimes(1);
  });

  it('does not show clear filters button when hasActiveFilters is false', () => {
    render(<MobileFilterBar {...defaultProps} hasActiveFilters={false} />);
    
    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
  });

  it('shows clear filters button when hasActiveFilters is true', () => {
    render(<MobileFilterBar {...defaultProps} hasActiveFilters={true} />);
    
    expect(screen.getByText('Clear filters')).toBeInTheDocument();
  });

  it('calls onClearFilters when clear filters button is clicked', () => {
    render(<MobileFilterBar {...defaultProps} hasActiveFilters={true} />);
    
    const clearButton = screen.getByText('Clear filters');
    fireEvent.click(clearButton);
    
    expect(defaultProps.onClearFilters).toHaveBeenCalledTimes(1);
  });

  it('has mobile-only class on container', () => {
    render(<MobileFilterBar {...defaultProps} />);
    
    const container = screen.getByRole('button', { name: /open filters/i }).parentElement;
    expect(container).toHaveClass('mobile-only');
  });
});
