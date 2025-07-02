import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RestaurantContent from './RestaurantContent';
import { Restaurant } from '@/features/restaurants/types';

jest.mock('@/components/Atoms/BackButton', () => {
  return function MockBackButton({ children, to, id }: { children: React.ReactNode; to: string; id?: string }) {
    return <a href={to} id={id} data-testid="back-button">{children}</a>;
  };
});

jest.mock('@/components/Molecules/RestaurantHero', () => {
  return function MockRestaurantHero({ name, logoUrl }: { name: string; logoUrl?: string }) {
    return <div data-testid="restaurant-hero">Hero: {name} {logoUrl && `Logo: ${logoUrl}`}</div>;
  };
});

jest.mock('@/components/Molecules/RestaurantInfo', () => {
  return function MockRestaurantInfo({ rating, deliveryEtaMinutes, deliveryCost }: any) {
    return (
      <div data-testid="restaurant-info">
        Rating: {rating?.starRating} ({rating?.count})
        {deliveryEtaMinutes && ` | ETA: ${deliveryEtaMinutes.rangeLower}-${deliveryEtaMinutes.rangeUpper}min`}
        {deliveryCost !== undefined && ` | Cost: £${deliveryCost}`}
      </div>
    );
  };
});

jest.mock('@/components/Molecules/RestaurantTags', () => {
  return function MockRestaurantTags({ cuisines }: { cuisines: any[] }) {
    return <div data-testid="restaurant-tags">Cuisines: {cuisines.map(c => c.name).join(', ')}</div>;
  };
});

jest.mock('@/components/Molecules/RestaurantDeals', () => {
  return function MockRestaurantDeals({ deals }: { deals: any[] }) {
    if (!deals || deals.length === 0) return null;
    return <div data-testid="restaurant-deals">Deals: {deals.map(d => d.description).join(', ')}</div>;
  };
});

jest.mock('@/components/Molecules/RestaurantAddress', () => {
  return function MockRestaurantAddress({ address }: { address: any }) {
    return <div data-testid="restaurant-address">Address: {address.firstLine}, {address.city}</div>;
  };
});

// Wrapper component to provide Router context
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RestaurantContent', () => {
  const mockRestaurant: Restaurant = {
    id: '1',
    name: 'Test Restaurant',
    uniqueName: 'test-restaurant',
    logoUrl: 'https://example.com/logo.jpg',
    rating: {
      starRating: 4.5,
      count: 123,
      userRating: null,
    },
    cuisines: [
      { name: 'Italian', uniqueName: 'italian' },
      { name: 'Pizza', uniqueName: 'pizza' },
    ],
    deliveryEtaMinutes: {
      rangeLower: 30,
      rangeUpper: 45,
    },
    deliveryCost: 2.99,
    address: {
      firstLine: '123 Test Street',
      city: 'Test City',
      postalCode: 'TE1 2ST',
      location: {
        type: 'Point',
        coordinates: [-0.1, 51.5],
      },
    },
    deals: [
      { description: '20% off orders over £15', offerType: 'percentage' },
      { description: 'Free delivery', offerType: 'delivery' },
    ],
    isNew: false,
    driveDistanceMeters: 1000,
    openingTimeLocal: '11:00',
    deliveryOpeningTimeLocal: '11:00',
    isCollection: true,
    isDelivery: true,
    isOpenNowForCollection: true,
    isOpenNowForDelivery: true,
    isOpenNowForPreorder: false,
    isTemporarilyOffline: false,
    minimumDeliveryValue: 10,
    defaultDisplayRank: 1,
    isTemporaryBoost: false,
    isPremier: false,
    isTestRestaurant: false,
    tags: [],
    availability: {
      delivery: {
        isOpen: true,
        canPreOrder: false,
        isTemporarilyOffline: false,
      },
    },
  };

  const mockPageRef = React.createRef<HTMLDivElement>();

  it('renders all main components correctly', () => {
    renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    // Check main elements are present
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-hero')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-name')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-info')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-tags')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-deals')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-address')).toBeInTheDocument();
  });

  it('displays restaurant name correctly', () => {
    renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    const restaurantName = screen.getByTestId('restaurant-name');
    expect(restaurantName).toHaveTextContent('Test Restaurant');
  });

  it('passes correct props to BackButton', () => {
    renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    const backButton = screen.getByTestId('back-button');
    expect(backButton).toHaveAttribute('href', '/restaurants');
    expect(backButton).toHaveAttribute('id', 'back-button');
    expect(backButton).toHaveTextContent('← Back to list');
  });

  it('passes correct props to RestaurantHero', () => {
    renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    const hero = screen.getByTestId('restaurant-hero');
    expect(hero).toHaveTextContent('Hero: Test Restaurant Logo: https://example.com/logo.jpg');
  });

  it('passes correct props to RestaurantInfo', () => {
    renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    const info = screen.getByTestId('restaurant-info');
    expect(info).toHaveTextContent('Rating: 4.5 (123) | ETA: 30-45min | Cost: £2.99');
  });

  it('passes correct props to RestaurantTags', () => {
    renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    const tags = screen.getByTestId('restaurant-tags');
    expect(tags).toHaveTextContent('Cuisines: Italian, Pizza');
  });

  it('passes correct props to RestaurantDeals when deals exist', () => {
    renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    const deals = screen.getByTestId('restaurant-deals');
    expect(deals).toHaveTextContent('Deals: 20% off orders over £15, Free delivery');
  });

  it('handles restaurant without deals', () => {
    const restaurantWithoutDeals = { ...mockRestaurant, deals: [] };
    
    renderWithRouter(
      <RestaurantContent restaurant={restaurantWithoutDeals} pageRef={mockPageRef} />
    );

    expect(screen.queryByTestId('restaurant-deals')).not.toBeInTheDocument();
  });

  it('handles restaurant without logo', () => {
    const restaurantWithoutLogo = { ...mockRestaurant, logoUrl: '' };
    
    renderWithRouter(
      <RestaurantContent restaurant={restaurantWithoutLogo} pageRef={mockPageRef} />
    );

    const hero = screen.getByTestId('restaurant-hero');
    expect(hero).toHaveTextContent('Hero: Test Restaurant');
    expect(hero).not.toHaveTextContent('Logo:');
  });

  it('handles restaurant with empty cuisines', () => {
    const restaurantWithoutCuisines = { ...mockRestaurant, cuisines: [] };
    
    renderWithRouter(
      <RestaurantContent restaurant={restaurantWithoutCuisines} pageRef={mockPageRef} />
    );

    const tags = screen.getByTestId('restaurant-tags');
    expect(tags).toHaveTextContent('Cuisines:');
  });

  it('handles restaurant with undefined optional fields', () => {
    const minimalRestaurant = {
      ...mockRestaurant,
      logoUrl: undefined,
      rating: undefined,
      deliveryEtaMinutes: undefined,
      deliveryCost: undefined,
      deals: undefined,
    } as any;
    
    renderWithRouter(
      <RestaurantContent restaurant={minimalRestaurant} pageRef={mockPageRef} />
    );

    // Should still render without errors
    expect(screen.getByTestId('restaurant-name')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-hero')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-info')).toBeInTheDocument();
  });

  it('applies pageRef to wrapper element', () => {
    const { container } = renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    // The ref should be applied to the wrapper element
    expect(mockPageRef.current).toBe(container.firstChild);
  });

  it('passes correct address data to RestaurantAddress', () => {
    renderWithRouter(
      <RestaurantContent restaurant={mockRestaurant} pageRef={mockPageRef} />
    );

    const address = screen.getByTestId('restaurant-address');
    expect(address).toHaveTextContent('Address: 123 Test Street, Test City');
  });
});
