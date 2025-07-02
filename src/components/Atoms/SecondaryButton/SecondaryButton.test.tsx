import { render, screen, fireEvent } from '@testing-library/react';
import SecondaryButton from './SecondaryButton';
import 'jest-styled-components';

describe('SecondaryButton', () => {
  it('renders with child text', () => {
    render(<SecondaryButton>Click Me</SecondaryButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(<SecondaryButton onClick={onClick}>Click Me</SecondaryButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('is disabled if disabled prop is set', () => {
    const onClick = jest.fn();
    render(
      <SecondaryButton onClick={onClick} disabled>
        Disabled
      </SecondaryButton>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies the correct styles', () => {
    const { container } = render(<SecondaryButton>Styled Button</SecondaryButton>);
    const button = container.firstChild;

    expect(button).toHaveStyleRule('background', '#fff');
    expect(button).toHaveStyleRule('border-radius', '2px');
    expect(button).toHaveStyleRule('color', '#23292e');
    expect(button).toHaveStyleRule('border', '1.7px solid #e4e4e4');
    expect(button).toHaveStyleRule('box-shadow', '0 1px 8px rgba(50, 50, 50, 0.03)');
  });

  it('applies hover styles', () => {
    const { container } = render(<SecondaryButton>Styled Button</SecondaryButton>);
    const button = container.firstChild;
    expect(button).toHaveStyleRule('border-color', '#ff8000', {
      modifier: ':hover',
    });
    expect(button).toHaveStyleRule('color', '#ff8000', {
      modifier: ':hover',
    });
    expect(button).toHaveStyleRule('background', '#fff7f0', {
      modifier: ':hover',
    });
  });
});
