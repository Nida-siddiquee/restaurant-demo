import styled from 'styled-components';
import { MapViewProps } from './types';

const MapContainer = styled.div`
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const MapView: React.FC<MapViewProps> = ({ latitude, longitude, zoom = 15 }) => {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

  return (
    <MapContainer role="img" aria-label={`Map showing restaurant location at coordinates ${latitude}, ${longitude}`}>
      <iframe
        title="Restaurant Location Map"
        width="100%"
        height="280"
        src={mapUrl}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-describedby="map-description"
      />
      <div id="map-description" className="sr-only">
        Interactive map showing the restaurant's location. You can zoom and pan to explore the area.
      </div>
    </MapContainer>
  );
};

export default MapView;
