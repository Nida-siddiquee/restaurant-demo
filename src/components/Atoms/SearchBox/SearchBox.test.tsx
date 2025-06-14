import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('renders input with value and placeholder', () => {
    render(<SearchBox value="food" onChange={() => {}} placeholder="Type…" />);
    const input = screen.getByPlaceholderText('Type…');
    expect(input).toHaveValue('food');
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<SearchBox value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'pizza' } });
    expect(handleChange).toHaveBeenCalledWith('pizza');
  });

it('renders the search icon', () => {
  render(<SearchBox value="" onChange={() => {}} />);
  expect(screen.getByTestId('search-svg')).toBeInTheDocument();
});

  it('renders clear button only if value and onClear are provided', () => {
    const handleClear = jest.fn();
    render(<SearchBox value="x" onChange={() => {}} onClear={handleClear} />);
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
  });

  it('does not render clear button if value is empty', () => {
    const handleClear = jest.fn();
    render(<SearchBox value="" onChange={() => {}} onClear={handleClear} />);
    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();
  });

  it('does not render clear button if onClear is missing', () => {
    render(<SearchBox value="something" onChange={() => {}} />);
    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    const handleClear = jest.fn();
    render(<SearchBox value="pizza" onChange={() => {}} onClear={handleClear} />);
    fireEvent.click(screen.getByLabelText(/clear search/i));
    expect(handleClear).toHaveBeenCalled();
  });
});