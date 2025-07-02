import React from 'react';
import MapView from '@/components/Atoms/MapView';
import { Section, SectionTitle, MapWrapper } from './RestaurantAddress.styled';
import { RestaurantAddressProps } from './types';

const RestaurantAddress: React.FC<RestaurantAddressProps> = ({ address }) => {
  const [lng, lat] = address.location.coordinates;

  return (
    <Section>
      <SectionTitle>Address</SectionTitle>
      <p>
        {address.firstLine}
        <br />
        {address.city} {address.postalCode}
      </p>
      <MapWrapper>
        <MapView latitude={lat} longitude={lng} />
      </MapWrapper>
    </Section>
  );
};

export default RestaurantAddress;
