import React from 'react';
import { RestaurantContentProps } from './types';
import { Wrapper, Name } from './RestaurantContent.styled';
import BackButton from '@/components/Atoms/BackButton';
import RestaurantHero from '@/components/Molecules/RestaurantHero';
import RestaurantInfo from '@/components/Molecules/RestaurantInfo';
import RestaurantTags from '@/components/Molecules/RestaurantTags';
import RestaurantDeals from '@/components/Molecules/RestaurantDeals';
import RestaurantAddress from '@/components/Molecules/RestaurantAddress';

const RestaurantContent: React.FC<RestaurantContentProps> = ({ restaurant, pageRef }) => {
  const {
    logoUrl,
    name,
    rating,
    cuisines = [],
    deliveryEtaMinutes,
    deliveryCost,
    address,
    deals,
  } = restaurant;

  return (
    <Wrapper ref={pageRef}>
      <BackButton id="back-button" to="/restaurants">
        ← Back to list
      </BackButton>

      <RestaurantHero name={name} logoUrl={logoUrl} />

      <Name data-testid="restaurant-name">{name}</Name>

      <RestaurantInfo 
        rating={rating}
        deliveryEtaMinutes={deliveryEtaMinutes}
        deliveryCost={deliveryCost}
      />

      <RestaurantTags cuisines={cuisines} />

      <RestaurantDeals deals={deals} />

      <RestaurantAddress address={address} />
    </Wrapper>
  );
};

export default RestaurantContent;
