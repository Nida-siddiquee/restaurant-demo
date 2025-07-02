import React from 'react';
import ErrorDisplay from '@/components/Atoms/ErrorDisplay';
import { RestaurantErrorStateProps } from './types';
import { Wrapper } from './RestaurantErrorState.styled';

const RestaurantErrorState: React.FC<RestaurantErrorStateProps> = ({ 
  error, 
  onRetry, 
  onGoHome 
}) => {
  return (
    <Wrapper>
      <ErrorDisplay
        error={error}
        onRetry={onRetry}
        onGoHome={onGoHome}
      />
    </Wrapper>
  );
};

export default RestaurantErrorState;
