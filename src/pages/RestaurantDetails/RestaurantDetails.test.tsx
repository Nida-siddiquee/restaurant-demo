import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RestaurantDetailPage from './RestaurantDetails';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { mockRestaurant } from './mockRestaurant';

jest.mock('@/components/Atoms/MapView', () => () => <div>MapView</div>);
jest.mock('@/components/Molecules/LoadingScreen', () => () => <div>LoadingScreen</div>);
jest.mock('@/pages/ErrorPage', () => () => <div>ErrorPage</div>);

const useRestaurantDetailsMock = {
  pageRef: { current: null },
  selected: null,
  loading: false,
  error: null,
  handlingError: null,
  handleRetry: jest.fn(),
  handleGoHome: jest.fn(),
};

jest.mock('@/hooks', () => ({
  useRestaurantDetails: jest.fn(() => useRestaurantDetailsMock),
}));

async function renderWithProviders(storeState: any, route: string = '/restaurants/200586') {
  const mockStore = configureStore([]);
  const store = mockStore(storeState);

  useRestaurantDetailsMock.selected = storeState.restaurants.selected;
  useRestaurantDetailsMock.loading = storeState.restaurants.loading;
  useRestaurantDetailsMock.error = storeState.restaurants.error;

  let renderResult: ReturnType<typeof render>;

  await act(async () => {
    renderResult = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  });

  await waitFor(() => {});

  return renderResult!;
}

describe('RestaurantDetailPage', () => {
  it('renders loading screen when loading', async () => {
    await renderWithProviders({
      restaurants: { selected: null, loading: true, error: null },
      postcodes: { selected: { code: 'CF11', label: 'Cardiff' } },
    });
    expect(screen.getByText(/LoadingScreen/i)).toBeInTheDocument();
  });

  it('renders error page when error exists', async () => {
    await renderWithProviders({
      restaurants: { selected: null, loading: false, error: 'Something went wrong' },
      postcodes: { selected: { code: 'CF11', label: 'Cardiff' } },
    });
    expect(
      screen.getByText(/Service Unavailable|Connection Problem|Something went wrong/i),
    ).toBeInTheDocument();
  });

  it('renders error page when restaurant not found', async () => {
    await renderWithProviders({
      restaurants: { selected: null, loading: false, error: null },
      postcodes: { selected: { code: 'CF11', label: 'Cardiff' } },
    });
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });

  it('renders restaurant details correctly', async () => {
    await renderWithProviders({
      restaurants: { selected: mockRestaurant, loading: false, error: null },
      postcodes: { selected: { code: 'CF11', label: 'Cardiff' } },
    });

    expect(screen.getByText(/← Back to list/i)).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-name')).toHaveTextContent('Ostro');
    expect(screen.getByText(/4.5 \(134\)/)).toBeInTheDocument();
    expect(screen.getByLabelText('Delivery time')).toHaveTextContent('35-50 min');
    expect(screen.getByLabelText('Delivery cost')).toHaveTextContent('£2.99 delivery');
    expect(screen.getByLabelText('Cuisines')).toHaveTextContent(/Chicken/i);
    expect(screen.getByText(/Deals & Promotions/i)).toBeInTheDocument();
    expect(screen.getByText(/£8 off when you spend £25/i)).toBeInTheDocument();
    expect(screen.getByText(/MapView/i)).toBeInTheDocument();
  });

  it('shows address details', async () => {
    await renderWithProviders({
      restaurants: { selected: mockRestaurant, loading: false, error: null },
      postcodes: { selected: { code: 'CF11', label: 'Cardiff' } },
    });

    expect(screen.getByText(/29 - 31 City Road/i)).toBeInTheDocument();
    expect(screen.getByText(/Cardiff CF24 3BJ/i)).toBeInTheDocument();
  });

  it('renders only first 6 cuisines', async () => {
    const manyCuisines = [...Array(10)].map((_, i) => ({
      name: `Cuisine${i}`,
      uniqueName: `cuisine${i}`,
    }));

    await renderWithProviders({
      restaurants: {
        selected: { ...mockRestaurant, cuisines: manyCuisines },
        loading: false,
        error: null,
      },
      postcodes: { selected: { code: 'CF11', label: 'Cardiff' } },
    });

    for (let i = 0; i < 6; i++) {
      expect(screen.getByText(`Cuisine${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByText('Cuisine6')).not.toBeInTheDocument();
  });

  it('back link navigates to /restaurants', async () => {
    await renderWithProviders({
      restaurants: { selected: mockRestaurant, loading: false, error: null },
      postcodes: { selected: { code: 'CF11', label: 'Cardiff' } },
    });

    const backLink = screen.getByText(/← Back to list/i);
    expect(backLink).toHaveAttribute('href', '/restaurants');
  });
});
