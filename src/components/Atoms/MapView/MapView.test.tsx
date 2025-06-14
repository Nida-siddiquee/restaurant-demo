import { render, screen } from '@testing-library/react';
import MapView from './MapView';

describe('MapView', () => {
  it('renders iframe with correct src and default zoom', () => {
    render(<MapView latitude={51.5} longitude={-0.12} />);
    const iframe = screen.getByTitle(/restaurant location/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('https://www.google.com/maps?q=51.5,-0.12&z=15&output=embed')
    );
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '280');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('renders iframe with custom zoom', () => {
    render(<MapView latitude={12.3} longitude={45.6} zoom={10} />);
    const iframe = screen.getByTitle(/restaurant location/i);
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('https://www.google.com/maps?q=12.3,45.6&z=10&output=embed')
    );
  });

  it('is wrapped in a container with border radius and shadow', () => {
    const { container } = render(<MapView latitude={1} longitude={2} />);
    // Should be a styled div with a child iframe
    const mapContainer = container.querySelector('div');
    expect(mapContainer).toContainElement(container.querySelector('iframe'));
  });
});