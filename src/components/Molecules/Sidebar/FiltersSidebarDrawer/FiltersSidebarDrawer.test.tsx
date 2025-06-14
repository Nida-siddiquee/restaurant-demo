import { render, screen, fireEvent } from '@testing-library/react';
import FiltersSidebarDrawer from './FiltersSidebarDrawer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { FILTERS } from '../constants';

const mockStore = configureStore([]);
const defaultFilters = FILTERS.reduce((acc, f) => ({ ...acc, [f.id]: false }), {});

function renderDrawer({ open = true, filters = {}, onClose = jest.fn() } = {}) {
  const store = mockStore({
    restaurants: { activeFilters: { ...defaultFilters, ...filters } },
  });
  store.dispatch = jest.fn();
  return {
    ...render(
      <Provider store={store}>
        <FiltersSidebarDrawer open={open} onClose={onClose} />
      </Provider>,
    ),
    store,
    onClose,
  };
}

describe('FiltersSidebarDrawer', () => {
  it('renders overlay and drawer when open', () => {
    renderDrawer({ open: true });
    expect(screen.getByText(/Filters/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close filters/i })).toBeInTheDocument();
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });

  it('does not render drawer or overlay when closed', () => {
    renderDrawer({ open: false });
    expect(screen.queryByText(/Filters/i)).not.toBeInTheDocument();
  });

  it('renders all filter labels and toggles', () => {
    renderDrawer({ open: true });
    FILTERS.forEach(f => {
      expect(screen.getByText(f.label)).toBeInTheDocument();
    });
    expect(screen.getAllByRole('checkbox').length).toBe(FILTERS.length);
  });

  it('toggles checked state according to activeFilters', () => {
    const filters = { [FILTERS[1].id]: true };
    renderDrawer({ open: true, filters });
    const toggles = screen.getAllByRole('checkbox');
    expect(toggles[1]).toBeChecked();
  });

  it('dispatches setActiveFilters when a switch is toggled', () => {
    const { store } = renderDrawer({ open: true });
    const toggles = screen.getAllByRole('checkbox');
    fireEvent.click(toggles[0]);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    renderDrawer({ open: true, onClose });
    fireEvent.click(screen.getByTestId('overlay'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    renderDrawer({ open: true, onClose });
    fireEvent.click(screen.getByRole('button', { name: /close filters/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
