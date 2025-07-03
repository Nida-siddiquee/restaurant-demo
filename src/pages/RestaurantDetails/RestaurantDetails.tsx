import React from 'react';
import LoadingScreen from '@/components/Molecules/LoadingScreen';
import ErrorBoundary from '@/components/Atoms/ErrorBoundary';
import RestaurantContent from '@/components/Organisims/RestaurantContent';
import RestaurantErrorState from '@/components/Molecules/RestaurantErrorState';
import { createNotFoundError, createGenericError } from '@/utils/errors';
import { useRestaurantDetails } from '@/hooks';

const RestaurantDetails: React.FC = () => {
  const { pageRef, selected, loading, error, handlingError, handleRetry, handleGoHome } =
    useRestaurantDetails();

  if (loading) {
    return (
      <ErrorBoundary>
        <LoadingScreen />
      </ErrorBoundary>
    );
  }

  if (error || handlingError) {
    const displayError = handlingError || createGenericError(error || 'Unknown error');

    return (
      <ErrorBoundary>
        <RestaurantErrorState error={displayError} onRetry={handleRetry} onGoHome={handleGoHome} />
      </ErrorBoundary>
    );
  }

  if (!selected) {
    const notFoundError = createNotFoundError('Restaurant');

    return (
      <ErrorBoundary>
        <RestaurantErrorState error={notFoundError} onGoHome={handleGoHome} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <RestaurantContent restaurant={selected} pageRef={pageRef} />
    </ErrorBoundary>
  );
};

export default RestaurantDetails;
