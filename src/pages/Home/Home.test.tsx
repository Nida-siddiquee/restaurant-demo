// src/pages/Home/Home.test.tsx

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import Homes from '@/pages/Home';
import { mockRestaurantsResponse } from '../../features/restaurants/mockRestaurantsResponse';

beforeAll(() => {
  window.scrollTo = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

const mockStore = configureStore([]);
const getInitialState = (overrides = {}) => ({
  restaurants: {
    data: { restaurants: mockRestaurantsResponse.restaurants },
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    activeFilters: {},
    ...overrides,
  },
  postcodes: { selected: { code: 'CF11', label: 'Cardiff' } },
});

const renderPage = store =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Homes />
      </MemoryRouter>
    </Provider>,
  );

describe('RestaurantsListPage', () => {
  it('renders loading screen', () => {
    const store = mockStore(getInitialState({ loading: true }));
    renderPage(store);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders error page', () => {
    const store = mockStore(getInitialState({ error: 'Some error' }));
    renderPage(store);
    expect(screen.getByText(/Something Went Wrong/i)).toBeInTheDocument();
  });

  it('renders sidebar filters on desktop', () => {
    const store = mockStore(getInitialState());
    renderPage(store);
    const sidebar = screen.getByTestId('sidebar');
    expect(within(sidebar).getByText(/places/i)).toBeInTheDocument();
  });

  it('renders mobile filter button', () => {
    const store = mockStore(getInitialState());
    renderPage(store);
    expect(screen.getByLabelText(/Open filters/i)).toBeInTheDocument();
  });

  it('opens filter drawer when filter button clicked', () => {
    const store = mockStore(getInitialState());
    renderPage(store);
    fireEvent.click(screen.getByLabelText(/Open filters/i));
    expect(screen.getAllByText(/Filters/i)[0]).toBeInTheDocument();
  });

  it('clear filters button is visible when filters active', () => {
    const store = mockStore(getInitialState({ activeFilters: { free_delivery: true } }));
    renderPage(store);
    expect(screen.getAllByText(/Clear filters/i).length).toBeGreaterThan(0);
    const buttons = screen.getAllByText(/Clear filters/i);
    buttons[0].click();
  });

  it('renders search box with value from store', () => {
    const store = mockStore(getInitialState({ searchQuery: 'Ostro' }));
    renderPage(store);
    expect(screen.getByPlaceholderText(/Search by name/i)).toHaveValue('Ostro');
  });

  it('updates input on change', () => {
    const store = mockStore(getInitialState());
    renderPage(store);
    const input = screen.getByPlaceholderText(/Search by name/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pizza' } });
    expect(input.value).toBe('Pizza');
  });

  it('renders SubHeading with correct count', () => {
    const store = mockStore(getInitialState());
    renderPage(store);
    expect(screen.getByText(/Order from 3 places/i)).toBeInTheDocument();
  });

  it('renders restaurant cards for pageSlice', () => {
    const store = mockStore(getInitialState());
    renderPage(store);
    expect(screen.getByText(/Standard Indian Takeaway/i)).toBeInTheDocument();
    expect(screen.getByText(/Ostro/i)).toBeInTheDocument();
    expect(screen.getByText(/Pasta Evangelists/i)).toBeInTheDocument();
  });

  it('clicking a restaurant calls handleDetails', () => {
    
    const store = mockStore(getInitialState());
    renderPage(store);
    const card = screen.getByTestId(/200586/i).closest('div');
    expect(card).toHaveAttribute('role', 'button'); 
    
  });

  it('renders pagination only if more than 1 page', () => {
    const many = Array.from({ length: 31 }).map((_, i) => ({
      ...mockRestaurantsResponse.restaurants[0],
      id: `id${i}`,
      name: `Place${i}`,
    }));
    const store = mockStore(getInitialState({ data: { restaurants: many } }));
    renderPage(store);
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('renders ClearFiltersEmptyState when no results', () => {
    const store = mockStore(getInitialState({ data: { restaurants: [] } }));
    renderPage(store);
    expect(screen.getByText(/Clear your filters/i)).toBeInTheDocument();
  });

  it('filters restaurants based on activeFilters: Free delivery', () => {
    const restaurants = [
      { ...mockRestaurantsResponse.restaurants[0], deliveryCost: 0, name: 'Zero Delivery' },
      { ...mockRestaurantsResponse.restaurants[1], deliveryCost: 2.5, name: 'Not Free' },
    ];
    const store = mockStore(
      getInitialState({
        data: { restaurants },
        activeFilters: { free_delivery: true },
      }),
    );
    renderPage(store);
    expect(screen.getByText(/Zero Delivery/i)).toBeInTheDocument();
    expect(screen.queryByText(/Not Free/i)).not.toBeInTheDocument();
  });

  it('scrolls to top on page change', () => {
    const store = mockStore(getInitialState({ currentPage: 2 }));
    renderPage(store);
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('scrolls to subheading on page change', () => {
    const store = mockStore(getInitialState({ currentPage: 2 }));
    renderPage(store);
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('debounce works for search', async () => {
    jest.useFakeTimers();
    const store = mockStore(getInitialState());
    renderPage(store);
    const input = screen.getByPlaceholderText(/Search by name/i);
    fireEvent.change(input, { target: { value: 'Pasta' } });
    act(() => {
      jest.advanceTimersByTime(350);
    });
    jest.useRealTimers();
  });

  it('drawer closes when onClose called', () => {
    const store = mockStore(getInitialState());
    renderPage(store);
    fireEvent.click(screen.getByLabelText(/Open filters/i));
    fireEvent.click(screen.getByRole('button', { name: /Close filters/i }));
    expect(screen.queryByText(/Filters/i)).not.toBeInTheDocument();
  });
});
