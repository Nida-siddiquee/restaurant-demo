import { render, screen } from '@testing-library/react';
import Layout from './Layout';

jest.mock('@/components/Molecules/Header', () => () => (
  <header data-testid="header">MockHeader</header>
));

describe('Layout', () => {
  it('renders the layout container and main', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <Layout>
        <p>Another Child</p>
      </Layout>,
    );
    expect(screen.getByText('Another Child')).toBeInTheDocument();
  });

  it('renders Header component at the top', () => {
    render(
      <Layout>
        <div>Body</div>
      </Layout>,
    );
    expect(screen.getByTestId('header')).toHaveTextContent('MockHeader');
  });
});
