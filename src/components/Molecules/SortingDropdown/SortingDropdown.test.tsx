import { render, screen, fireEvent } from '@testing-library/react';
import SortingDropdown from './SortingDropdown';
import { SortOption } from '@/utils/sorting';

describe('SortingDropdown', () => {
  it('renders correctly with default value', () => {
    const mockOnChange = jest.fn();
    render(
      <SortingDropdown 
        value={SortOption.NONE} 
        onChange={mockOnChange} 
      />
    );
    
    const selectElement = screen.getByLabelText('Sort restaurants by');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue(SortOption.NONE);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('renders all sort options', () => {
    const mockOnChange = jest.fn();
    render(
      <SortingDropdown 
        value={SortOption.NONE} 
        onChange={mockOnChange} 
      />
    );
    
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Rating (Highest first)')).toBeInTheDocument();
    expect(screen.getByText('Delivery cost (Lowest first)')).toBeInTheDocument();
    expect(screen.getByText('Min. order amount (Lowest first)')).toBeInTheDocument();
    expect(screen.getByText('Distance (Nearest first)')).toBeInTheDocument();
  });

  it('calls onChange when a different option is selected', () => {
    const mockOnChange = jest.fn();
    render(
      <SortingDropdown 
        value={SortOption.NONE} 
        onChange={mockOnChange} 
      />
    );
    
    const selectElement = screen.getByLabelText('Sort restaurants by');
    fireEvent.change(selectElement, { 
      target: { value: SortOption.RATING_HIGH_TO_LOW } 
    });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(SortOption.RATING_HIGH_TO_LOW);
  });
});
