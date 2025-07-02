import React from 'react';
import { Hero } from './RestaurantHero.styled';
import { RestaurantHeroProps } from './types';

const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80';

const RestaurantHero: React.FC<RestaurantHeroProps> = ({ name, logoUrl }) => {
  return (
    <Hero>
      <img src={FALLBACK_HERO} alt={`${name} banner image`} className="hero" />
      {logoUrl && <img src={logoUrl} alt={`${name} logo`} className="logo" />}
    </Hero>
  );
};

export default RestaurantHero;
