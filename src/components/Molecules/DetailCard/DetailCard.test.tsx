import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantCard from './DetailCard';

describe('RestaurantCard', () => {
  const baseProps = {
    name: 'Testaurant',
    rating: 4.7,
    reviewCount: '100',
    deliveryTime: '20-30 min',
    deliveryFee: '£2.00',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all core info', () => {
    render(<RestaurantCard {...baseProps} />);
    expect(screen.getByText('Testaurant')).toBeInTheDocument();
    expect(screen.getByText('★')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
    expect(screen.getByText(/20-30 min/)).toBeInTheDocument();
    expect(screen.getByText(/Delivery from £2.00/)).toBeInTheDocument();
  });

  it('renders the logo image if logoUrl is provided', () => {
    render(<RestaurantCard {...baseProps} logoUrl="logo.png" />);
    const logo = screen.getByAltText('Testaurant logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo.png');
  });

  it('renders the hero image if heroUrl is provided', () => {
    render(<RestaurantCard {...baseProps} heroUrl="hero.png" />);
    const hero = screen.getByAltText('Testaurant banner');
    expect(hero).toBeInTheDocument();
    expect(hero).toHaveAttribute('src', 'hero.png');
  });

  it('renders the offer ribbon if offer is provided', () => {
    render(<RestaurantCard {...baseProps} offer="20% Off!" />);
    expect(screen.getByText(/20% Off!/)).toBeInTheDocument();
    // Optionally: check the tag icon by role or svg tag
    expect(screen.getByText(/20% Off!/).parentElement?.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the badge if badge is provided', () => {
    render(<RestaurantCard {...baseProps} badge="Sponsored" />);
    expect(screen.getByText('Sponsored')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<RestaurantCard {...baseProps} />);
    fireEvent.click(screen.getByText('Testaurant'));
    expect(baseProps.onClick).toHaveBeenCalled();
  });

  it('highlights the name if highlight is provided', () => {
    render(<RestaurantCard {...baseProps} highlight="Test" />);
    expect(screen.getByText('Test')).toContainHTML('mark');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <RestaurantCard
        {...baseProps}
        logoUrl="logo.png"
        heroUrl="hero.png"
        offer="Deal"
        badge="StampCard"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
