import { render, screen } from '@testing-library/react';
import Header from './Header';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

const renderWithProviders = (storeState: any) => {
  const store = mockStore(storeState);
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>,
  );
};

describe('Header', () => {
  it('renders the logo always', () => {
    renderWithProviders({ postcodes: { selected: null } });
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it('does not render postcode info if no postcode is selected', () => {
    renderWithProviders({ postcodes: { selected: null } });
    expect(screen.queryByText(/select area/i)).not.toBeInTheDocument();
  });

  it('renders postcode info when postcode is selected', () => {
    renderWithProviders({
      postcodes: {
        selected: { label: 'London, E1 8QS', code: 'E1 8QS' },
      },
    });
    expect(screen.getByText(/London, E1 8QS/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pin icon/i)).toBeInTheDocument();
  });

  it('postcode link has correct destination', () => {
    renderWithProviders({
      postcodes: {
        selected: { label: 'London, E1 8QS', code: 'E1 8QS' },
      },
    });
    const postcodeLink = screen.getByRole('link', { name: /London, E1 8QS/i });
    expect(postcodeLink).toHaveAttribute('href', '/');
  });

  it('logo links to correct location depending on postcode', () => {
    renderWithProviders({
      postcodes: {
        selected: { label: 'London, E1 8QS', code: 'E1 8QS' },
      },
    });
    const logoLink = screen.getByRole('link', { name: 'logo' });
    expect(logoLink).toHaveAttribute('href', '/restaurants');
  });
});
