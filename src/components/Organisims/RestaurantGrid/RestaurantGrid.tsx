import React from 'react';
import { Grid } from './RestaurantGrid.styled';
import RestaurantCard from '@/components/Molecules/DetailCard';
import { Restaurant } from '@/features/restaurants/types';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  searchQuery: string;
  onRestaurantClick: (id: string) => void;
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({
  restaurants,
  searchQuery,
  onRestaurantClick,
}) => {
  return (
    <Grid>
      {restaurants.map(restaurant => (
        <RestaurantCard
          logoUrl={restaurant.logoUrl}
          key={restaurant.id}
          testId={restaurant.id}
          name={restaurant.name}
          highlight={searchQuery}
          rating={restaurant.rating?.starRating ?? 0}
          reviewCount={restaurant.rating?.count?.toLocaleString() ?? '0'}
          deliveryTime={
            restaurant.deliveryEtaMinutes
              ? `${restaurant.deliveryEtaMinutes.rangeLower}-${restaurant.deliveryEtaMinutes.rangeUpper} min`
              : 'N/A'
          }
          deliveryFee={
            restaurant.deliveryCost !== undefined 
              ? `£${restaurant.deliveryCost.toFixed(2)}` 
              : 'N/A'
          }
          offer={restaurant.deals?.[0]?.description || undefined}
          badge={
            restaurant.isPremier
              ? 'Sponsored'
              : restaurant.deals?.some(deal => deal.offerType === 'StampCard')
                ? 'StampCard'
                : null
          }
          onClick={() => onRestaurantClick(restaurant.id)}
        />
      ))}
    </Grid>
  );
};

export default RestaurantGrid;
