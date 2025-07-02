import { render, screen, fireEvent } from '@testing-library/react';
import HomeContent from './HomeContent';
import { Restaurant } from '@/features/restaurants/types';
import { mockRestaurantsResponse } from '@/features/restaurants/mockRestaurantsResponse';
import { SortOption } from '@/utils/sorting';

jest.mock('../SearchAndHeading/SearchAndHeading', () => {
  return function MockSearchAndHeading(props: any) {
    return (
      <div data-testid="search-and-heading">
        <div>Restaurant count: {props.restaurantCount}</div>
        <input 
          data-testid="search-input"
          value={props.searchInput}
          onChange={(e) => props.onSearchChange(e.target.value)}
        />
      </div>
    );
  };
});

jest.mock('../RestaurantGrid/RestaurantGrid', () => {
  return function MockRestaurantGrid(props: any) {
    return (
      <div data-testid="restaurant-grid">
        {props.restaurants.map((restaurant: Restaurant) => (
          <div key={restaurant.id} data-testid={`restaurant-${restaurant.id}`}>
            {restaurant.name}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('@/components/Molecules/Sidebar/FiltersSidebar', () => {
  return function MockFiltersSidebar(props: any) {
    return (
      <div data-testid="filters-sidebar">
        <div>Total: {props.totalRestaurants}</div>
        <div data-testid="sort-option">{props.sortOption}</div>
        <button 
          data-testid="sort-change-button"
          onClick={() => props.onSortChange && props.onSortChange(SortOption.RATING_HIGH_TO_LOW)}
        >
          Change Sort
        </button>
      </div>
    );
  };
});

jest.mock('@/components/Atoms/ClearFiltersEmptyState', () => {
  return function MockClearFiltersEmptyState(props: any) {
    return (
      <div data-testid="clear-filters-empty-state">
        <button onClick={props.onClear}>Clear filters</button>
      </div>
    );
  };
});

jest.mock('@/components/Organisims/Pagination/Pagination', () => {
  return function MockPagination(props: any) {
    return (
      <div data-testid="pagination">
        Page {props.currentPage} of {props.totalPages}
      </div>
    );
  };
});

const mockRestaurant: Restaurant = mockRestaurantsResponse.restaurants[0];

const defaultProps = {
  searchInput: '',
  onSearchChange: jest.fn(),
  onSearchClear: jest.fn(),
  filteredRestaurants: [mockRestaurant],
  pageSlice: [mockRestaurant],
  searchQuery: '',
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  onRestaurantClick: jest.fn(),
  onPageChange: jest.fn(),
  onClearFilters: jest.fn(),
  sortOption: SortOption.NONE,
  onSortChange: jest.fn(),
};

describe('HomeContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main components', () => {
    render(<HomeContent {...defaultProps} />);
    
    expect(screen.getByTestId('filters-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('search-and-heading')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-grid')).toBeInTheDocument();
  });

  it('displays correct restaurant count in filters sidebar', () => {
    render(<HomeContent {...defaultProps} />);
    
    expect(screen.getByText('Total: 1')).toBeInTheDocument();
  });

  it('displays correct restaurant count in search and heading', () => {
    render(<HomeContent {...defaultProps} />);
    
    expect(screen.getByText('Restaurant count: 1')).toBeInTheDocument();
  });

  it('renders restaurants in the grid', () => {
    render(<HomeContent {...defaultProps} />);
    
    expect(screen.getByTestId(`restaurant-${mockRestaurant.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
  });

  it('shows pagination when total pages > 1', () => {
    render(<HomeContent {...defaultProps} totalPages={3} currentPage={2} />);
    
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });

  it('does not show pagination when total pages = 1', () => {
    render(<HomeContent {...defaultProps} totalPages={1} />);
    
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('shows clear filters empty state when no restaurants and not loading', () => {
    render(<HomeContent 
      {...defaultProps} 
      filteredRestaurants={[]}
      pageSlice={[]}
      loading={false}
      error={null}
    />);
    
    expect(screen.getByTestId('clear-filters-empty-state')).toBeInTheDocument();
  });

  it('does not show clear filters empty state when loading', () => {
    render(<HomeContent 
      {...defaultProps} 
      filteredRestaurants={[]}
      pageSlice={[]}
      loading={true}
      error={null}
    />);
    
    expect(screen.queryByTestId('clear-filters-empty-state')).not.toBeInTheDocument();
  });

  it('does not show clear filters empty state when there is an error', () => {
    render(<HomeContent 
      {...defaultProps} 
      filteredRestaurants={[]}
      pageSlice={[]}
      loading={false}
      error="Some error"
    />);
    
    expect(screen.queryByTestId('clear-filters-empty-state')).not.toBeInTheDocument();
  });

  it('does not show clear filters empty state when there are restaurants', () => {
    render(<HomeContent {...defaultProps} />);
    
    expect(screen.queryByTestId('clear-filters-empty-state')).not.toBeInTheDocument();
  });

  it('renders with the correct sort option in sidebar', () => {
    render(<HomeContent {...defaultProps} sortOption={SortOption.RATING_HIGH_TO_LOW} />);
    
    expect(screen.getByTestId('sort-option')).toHaveTextContent(SortOption.RATING_HIGH_TO_LOW);
  });

  it('calls onSortChange when sort is changed in sidebar', () => {
    render(<HomeContent {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('sort-change-button'));
    
    expect(defaultProps.onSortChange).toHaveBeenCalledWith(SortOption.RATING_HIGH_TO_LOW);
  });
});
