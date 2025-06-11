import styled from 'styled-components';

const MapContainer = styled.div`
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

type MapViewProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

const MapView: React.FC<MapViewProps> = ({ latitude, longitude, zoom = 15 }) => {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

  return (
    <MapContainer>
      <iframe
        title="Restaurant Location"
        width="100%"
        height="280"
        src={mapUrl}
        style={{ border: 0 }}
        allowFullScreen
      />
    </MapContainer>
  );
};

export default MapView;
