import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
  it('renders with given children', () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('has width 100%', () => {
    render(<PrimaryButton>Test</PrimaryButton>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle('width: 100%');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Click</PrimaryButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<PrimaryButton disabled>Disabled</PrimaryButton>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
  });
});
