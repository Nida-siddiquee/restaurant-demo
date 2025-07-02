import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BackButton from './BackButton';
import { BackButtonProps } from './types';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BackButton', () => {
  const defaultProps: BackButtonProps = {
    to: '/test-route',
    children: 'Back to Test',
  };

  it('renders with correct text content', () => {
    renderWithRouter(<BackButton {...defaultProps} />);
    
    expect(screen.getByText('Back to Test')).toBeInTheDocument();
  });

  it('renders as a link with correct href', () => {
    renderWithRouter(<BackButton {...defaultProps} />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-route');
  });

  it('applies custom id when provided', () => {
    renderWithRouter(
      <BackButton {...defaultProps} id="custom-back-button" />
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('id', 'custom-back-button');
  });

  it('does not have id attribute when id is not provided', () => {
    renderWithRouter(<BackButton {...defaultProps} />);
    
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('id');
  });

  it('renders with different route paths', () => {
    const { rerender } = renderWithRouter(
      <BackButton to="/home" children="Back to Home" />
    );
    
    expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
    
    rerender(
      <BrowserRouter>
        <BackButton to="/restaurants" children="Back to Restaurants" />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('link')).toHaveAttribute('href', '/restaurants');
  });

  it('renders with different children content', () => {
    const { rerender } = renderWithRouter(
      <BackButton to="/test" children="← Go Back" />
    );
    
    expect(screen.getByText('← Go Back')).toBeInTheDocument();
    
    rerender(
      <BrowserRouter>
        <BackButton to="/test" children={<span>Custom Back Element</span>} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Custom Back Element')).toBeInTheDocument();
  });

  it('handles complex children content', () => {
    const complexChildren = (
      <>
        <span>←</span>
        <span>Back to list</span>
      </>
    );
    
    renderWithRouter(
      <BackButton to="/list" children={complexChildren} />
    );
    
    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('Back to list')).toBeInTheDocument();
  });

  it('is accessible and has proper link semantics', () => {
    renderWithRouter(<BackButton {...defaultProps} />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-route');
    expect(link).toHaveTextContent('Back to Test');
  });
});
