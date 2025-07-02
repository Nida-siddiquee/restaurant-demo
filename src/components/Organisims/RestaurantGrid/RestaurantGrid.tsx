import React from 'react';
import { Grid, GridItem } from './RestaurantGrid.styled';
import RestaurantCard from '@/components/Molecules/DetailCard';
import { RestaurantGridProps } from './types';

const RestaurantGrid: React.FC<RestaurantGridProps> = ({
  restaurants,
  searchQuery,
  onRestaurantClick,
}) => {
  return (
    <Grid 
      role="list" 
      aria-label={`Restaurant search results, ${restaurants.length} restaurant${restaurants.length !== 1 ? 's' : ''} found`}
      aria-describedby="restaurant-count"
    >
      {restaurants.map(restaurant => (
        <GridItem key={restaurant.id} role="listitem">
          <RestaurantCard
            logoUrl={restaurant.logoUrl}
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
        </GridItem>
      ))}
    </Grid>
  );
};

export default RestaurantGrid;
