import { render, screen, fireEvent } from '@testing-library/react';
import SearchAndHeading from './SearchAndHeading';

jest.mock('@/components/Atoms/SearchBox', () => {
  return function MockSearchBox(props: any) {
    return (
      <input
        data-testid="search-box"
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    );
  };
});

describe('SearchAndHeading', () => {
  const defaultProps = {
    searchInput: '',
    onSearchChange: jest.fn(),
    onSearchClear: jest.fn(),
    restaurantCount: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search box', () => {
    render(<SearchAndHeading {...defaultProps} />);

    expect(screen.getByTestId('search-box')).toBeInTheDocument();
  });

  it('renders the search box with correct placeholder', () => {
    render(<SearchAndHeading {...defaultProps} />);

    expect(screen.getByPlaceholderText('Search by name, location, cuisine…')).toBeInTheDocument();
  });

  it('displays correct restaurant count with plural', () => {
    render(<SearchAndHeading {...defaultProps} restaurantCount={5} />);

    expect(screen.getByText('Order from 5 places')).toBeInTheDocument();
  });

  it('displays correct restaurant count with singular', () => {
    render(<SearchAndHeading {...defaultProps} restaurantCount={1} />);

    expect(screen.getByText('Order from 1 place')).toBeInTheDocument();
  });

  it('displays zero restaurants correctly', () => {
    render(<SearchAndHeading {...defaultProps} restaurantCount={0} />);

    expect(screen.getByText('Order from 0 places')).toBeInTheDocument();
  });

  it('passes search input value to SearchBox', () => {
    const searchInput = 'pizza';
    render(<SearchAndHeading {...defaultProps} searchInput={searchInput} />);

    const searchBox = screen.getByTestId('search-box');
    expect(searchBox).toHaveValue(searchInput);
  });

  it('calls onSearchChange when search input changes', () => {
    render(<SearchAndHeading {...defaultProps} />);

    const searchBox = screen.getByTestId('search-box');
    fireEvent.change(searchBox, { target: { value: 'burger' } });

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('burger');
  });

  it('has restaurant-count id on heading for accessibility', () => {
    render(<SearchAndHeading {...defaultProps} />);

    const heading = screen.getByText('Order from 5 places');
    expect(heading).toHaveAttribute('id', 'restaurant-count');
  });

  it('renders as h3 heading', () => {
    render(<SearchAndHeading {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Order from 5 places');
  });
});
