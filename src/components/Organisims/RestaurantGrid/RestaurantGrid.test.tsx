import { render, screen } from '@testing-library/react';
import RestaurantGrid from './RestaurantGrid';
import { mockRestaurantsResponse } from '@/features/restaurants/mockRestaurantsResponse';

jest.mock('@/components/Molecules/DetailCard', () => {
  return function MockRestaurantCard(props: any) {
    return (
      <div data-testid={props.testId} onClick={() => props.onClick && props.onClick()}>
        <div>{props.name}</div>
        <div>{props.highlight}</div>
        <div>Rating: {props.rating}</div>
        <div>Delivery: {props.deliveryTime}</div>
        <div>Fee: {props.deliveryFee}</div>
        {props.offer && <div>Offer: {props.offer}</div>}
        {props.badge && <div>Badge: {props.badge}</div>}
      </div>
    );
  };
});

describe('RestaurantGrid', () => {
  const mockRestaurants = mockRestaurantsResponse.restaurants.slice(0, 3);

  const defaultProps = {
    restaurants: mockRestaurants,
    searchQuery: '',
    onRestaurantClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all restaurants in a grid', () => {
    render(<RestaurantGrid {...defaultProps} />);

    mockRestaurants.forEach(restaurant => {
      expect(screen.getByTestId(restaurant.id)).toBeInTheDocument();
      expect(screen.getByText(restaurant.name)).toBeInTheDocument();
    });
  });

  it('passes correct props to RestaurantCard components', () => {
    render(<RestaurantGrid {...defaultProps} />);

    const firstRestaurant = mockRestaurants[0];
    expect(screen.getByText(firstRestaurant.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Rating: ${firstRestaurant.rating?.starRating || 0}`),
    ).toBeInTheDocument();
  });

  it('passes search query as highlight prop', () => {
    const searchQuery = 'pizza';
    render(<RestaurantGrid {...defaultProps} searchQuery={searchQuery} />);

    expect(screen.getAllByText(searchQuery)).toHaveLength(mockRestaurants.length);
  });

  it('displays delivery time correctly', () => {
    render(<RestaurantGrid {...defaultProps} />);

    const restaurantWithDeliveryTime = mockRestaurants.find(r => r.deliveryEtaMinutes);
    if (restaurantWithDeliveryTime?.deliveryEtaMinutes) {
      const expectedTime = `${restaurantWithDeliveryTime.deliveryEtaMinutes.rangeLower}-${restaurantWithDeliveryTime.deliveryEtaMinutes.rangeUpper} min`;
      expect(screen.getByText(`Delivery: ${expectedTime}`)).toBeInTheDocument();
    }
  });

  it('displays delivery fee correctly', () => {
    render(<RestaurantGrid {...defaultProps} />);

    const restaurantWithDeliveryFee = mockRestaurants.find(r => r.deliveryCost !== undefined);
    if (restaurantWithDeliveryFee) {
      const expectedFee = `£${restaurantWithDeliveryFee.deliveryCost.toFixed(2)}`;
      expect(screen.getByText(`Fee: ${expectedFee}`)).toBeInTheDocument();
    }
  });

  it('displays offers when available', () => {
    render(<RestaurantGrid {...defaultProps} />);

    const restaurantWithDeal = mockRestaurants.find(r => r.deals && r.deals.length > 0);
    if (restaurantWithDeal?.deals?.[0]?.description) {
      expect(
        screen.getByText(`Offer: ${restaurantWithDeal.deals[0].description}`),
      ).toBeInTheDocument();
    }
  });

  it('displays badge for premier restaurants', () => {
    render(<RestaurantGrid {...defaultProps} />);

    const premierRestaurant = mockRestaurants.find(r => r.isPremier);
    if (premierRestaurant) {
      expect(screen.getByText('Badge: Premier')).toBeInTheDocument();
    }
  });

  it('handles empty restaurants array', () => {
    render(<RestaurantGrid {...defaultProps} restaurants={[]} />);
    expect(document.body).toBeInTheDocument();
  });

  it('calls onRestaurantClick when restaurant card is clicked', () => {
    render(<RestaurantGrid {...defaultProps} />);
    expect(defaultProps.onRestaurantClick).toBeDefined();
  });
});
