import { render, screen, fireEvent } from '@testing-library/react';
import FiltersSidebar from './FiltersSidebar';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { FILTERS } from '../constants';

const mockStore = configureStore([]);
const defaultFilters = FILTERS.reduce((acc, f) => ({ ...acc, [f.id]: false }), {});

function renderSidebar(storeState = {}) {
  const store = mockStore({
    restaurants: {
      activeFilters: defaultFilters,
      ...storeState
    }
  });
  return render(
    <Provider store={store}>
      <FiltersSidebar totalRestaurants={11} />
    </Provider>
  );
}

describe('FiltersSidebar', () => {
  it('renders the sidebar with correct total restaurant count', () => {
    renderSidebar();
    expect(screen.getByText(/11 places/)).toBeInTheDocument();
  });

  it('renders all filters and toggles', () => {
    renderSidebar();
    FILTERS.forEach(f => {
      expect(screen.getByText(f.label)).toBeInTheDocument();
    });
    expect(screen.getAllByRole('checkbox').length).toBe(FILTERS.length);
  });

  it('does not show Clear filters when no filters are active', () => {
    renderSidebar();
    expect(screen.queryByText(/clear filters/i)).not.toBeInTheDocument();
  });

  it('shows Clear filters when at least one filter is active', () => {
    const filters = { ...defaultFilters, [FILTERS[0].id]: true };
    renderSidebar({ activeFilters: filters });
    expect(screen.getByText(/clear filters/i)).toBeInTheDocument();
  });

  it('calls resetFilters when Clear Filters is clicked', () => {
    const filters = { ...defaultFilters, [FILTERS[0].id]: true };
    const store = mockStore({ restaurants: { activeFilters: filters } });
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <FiltersSidebar totalRestaurants={11} />
      </Provider>
    );
    fireEvent.click(screen.getByText(/clear filters/i));
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('calls setActiveFilters when a toggle is changed', () => {
    const store = mockStore({ restaurants: { activeFilters: defaultFilters } });
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <FiltersSidebar totalRestaurants={11} />
      </Provider>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('each ToggleSwitch reflects checked state', () => {
    const filters = { ...defaultFilters, [FILTERS[1].id]: true };
    renderSidebar({ activeFilters: filters });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[1]).toBeChecked();
  });
});