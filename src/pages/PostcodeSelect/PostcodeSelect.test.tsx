import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import PostcodeSelectPage from './PostcodeSelect';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureStore([]);
const mockPostcodes = [
  { code: 'CF11', label: 'Cardiff' },
  { code: 'CF24', label: 'Cathays' },
];

const getInitialState = (overrides = {}) => ({
  postcodes: {
    data: mockPostcodes,
    selected: null,
    loading: false,
    ...overrides,
  },
  restaurants: {},
});
const renderPage = store =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PostcodeSelectPage />
      </MemoryRouter>
    </Provider>,
  );
describe('PostcodeSelectPage', () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    ((useDispatch as unknown) as jest.Mock).mockReturnValue(dispatch);
    mockNavigate.mockClear();
  });

  it('renders the title and postcode options', () => {
    const store = mockStore(getInitialState());
   renderPage(store)
    expect(screen.getByText(/select your area/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /cardiff/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /cathays/i })).toBeInTheDocument();
  });

  it('dispatches fetchPostcodesRequest on mount', () => {
    const store = mockStore(getInitialState());
   renderPage(store)
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'postcodes/fetchPostcodesRequest' }));
  });

  it('shows loading state when loading is true', () => {
    const store = mockStore(getInitialState({ loading: true }));
   renderPage(store)
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('enables button only when a postcode is selected', () => {
    const store = mockStore(getInitialState());
   renderPage(store)
    const btn = screen.getByTestId('view-restaurants-btn');
    expect(btn).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/postcode select/i), { target: { value: 'CF11' } });
    expect(btn).not.toBeDisabled();
  });

  it('disables the button while loading', () => {
    const store = mockStore(getInitialState({ loading: true }));
   renderPage(store)
    const btn = screen.queryByTestId('view-restaurants-btn');
    expect(btn).not.toBeInTheDocument(); 
  });

  it('dispatches selectPostcode and fetchRestaurantsRequest and navigates when "View Restaurants" is clicked', () => {
    const store = mockStore(getInitialState());
   renderPage(store)
    fireEvent.change(screen.getByLabelText(/postcode select/i), { target: { value: 'CF11' } });
    fireEvent.click(screen.getByTestId('view-restaurants-btn'));

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'postcodes/selectPostcode' }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'restaurants/fetchRestaurantsRequest' }));
    expect(mockNavigate).toHaveBeenCalledWith('/restaurants');
  });

  it('does not dispatch or navigate if no postcode is selected', () => {
    const store = mockStore(getInitialState());
   renderPage(store)
    fireEvent.click(screen.getByTestId('view-restaurants-btn'));
    expect(dispatch).toHaveBeenCalledTimes(1); // Only initial fetchPostcodesRequest
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('select has correct label for accessibility', () => {
    const store = mockStore(getInitialState());
   renderPage(store)
    expect(screen.getByLabelText(/postcode select/i)).toBeInTheDocument();
  });
});