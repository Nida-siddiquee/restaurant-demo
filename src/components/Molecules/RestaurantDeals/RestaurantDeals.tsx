import React from 'react';
import { Section, SectionTitle, DealChip } from './RestaurantDeals.styled';
import { RestaurantDealsProps } from './types';

const RestaurantDeals: React.FC<RestaurantDealsProps> = ({ deals }) => {
  if (!deals || deals.length === 0) return null;

  return (
    <Section>
      <SectionTitle>Deals & Promotions</SectionTitle>
      {deals.map((deal, i) => (
        <DealChip key={i}>{deal.description}</DealChip>
      ))}
    </Section>
  );
};

export default RestaurantDeals;
