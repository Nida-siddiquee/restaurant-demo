import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

import MapView from '@/components/Atoms/MapView';
import LoadingScreen from '@/components/Molecules/LoadingScreen';
import ErrorDisplay from '@/components/Atoms/ErrorDisplay';
import ErrorBoundary from '@/components/Atoms/ErrorBoundary';
import { selectRestaurant, fetchRestaurantsRequest } from '@/features/restaurants/restaurantsSlice';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { createNotFoundError, createGenericError } from '@/utils/errors';
import {
  Wrapper,
  BackLink,
  Hero,
  Name,
  InfoRow,
  Tags,
  Section,
  SectionTitle,
  DealChip,
  MapWrapper,
} from './RestaurantDetails.styled';

const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80';

const useSelectedPostcode = () => useSelector((state: RootState) => state.postcodes.selected?.code);

const RestaurantDetailsWithErrorHandling: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const postcode = useSelectedPostcode();
  const { selected, loading, error } = useSelector((s: RootState) => s.restaurants);

  const { 
    error: handlingError, 
    executeWithErrorHandling, 
    clearError 
  } = useErrorHandler({
    maxRetries: 2,
    onError: (err) => console.error('Error in RestaurantDetails:', err),
  });

  useEffect(() => {
    const initializeRestaurant = async () => {
      if (!selected) {
        if (postcode) {
          await executeWithErrorHandling(async () => {
            dispatch(fetchRestaurantsRequest(postcode));
          }, { action: 'fetch_restaurants_for_details', postcode, restaurantId: id });
        } else {
          navigate('/');
        }
      } else if (id && selected && id !== selected.id) {
        await executeWithErrorHandling(async () => {
          dispatch(selectRestaurant(id));
        }, { action: 'select_restaurant', restaurantId: id });
      }
    };

    initializeRestaurant();

    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [dispatch, id, navigate, postcode, selected, executeWithErrorHandling]);

  const handleRetry = async () => {
    clearError();
    if (postcode) {
      await executeWithErrorHandling(async () => {
        dispatch(fetchRestaurantsRequest(postcode));
      }, { action: 'retry_fetch_restaurants', postcode, restaurantId: id });
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

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
        <Wrapper>
          <ErrorDisplay
            error={displayError}
            onRetry={handleRetry}
            onGoHome={handleGoHome}
          />
        </Wrapper>
      </ErrorBoundary>
    );
  }

  if (!selected) {
    const notFoundError = createNotFoundError('Restaurant');
    
    return (
      <ErrorBoundary>
        <Wrapper>
          <ErrorDisplay
            error={notFoundError}
            onGoHome={handleGoHome}
          />
        </Wrapper>
      </ErrorBoundary>
    );
  }

  const {
    logoUrl,
    name,
    rating,
    cuisines = [],
    deliveryEtaMinutes,
    deliveryCost,
    address,
    deals,
  } = selected;
  const [lng, lat] = address.location.coordinates;

  return (
    <ErrorBoundary>
      <Wrapper ref={pageRef}>
        <BackLink id="back-button" to="/restaurants">
          ← Back to list
        </BackLink>

        <Hero>
          <img src={FALLBACK_HERO} alt={`${name} banner image`} className="hero" />
          {logoUrl && <img src={logoUrl} alt={`${name} logo`} className="logo" />}
        </Hero>

        <Name data-testid="restaurant-name">{name}</Name>

        <InfoRow>
          <span className="star" aria-label="Rating">
            ★
          </span>
          {rating?.starRating ?? 0} ({rating?.count ?? 0})
          {deliveryEtaMinutes && (
            <>
              {' '}
              •{' '}
              <span aria-label="Delivery time">
                🕒 {deliveryEtaMinutes.rangeLower}-{deliveryEtaMinutes.rangeUpper} min
              </span>
            </>
          )}
          {deliveryCost !== undefined && (
            <>
              {' '}
              •{' '}
              <span aria-label="Delivery cost">
                🚚 {deliveryCost === 0 ? 'Free delivery' : `£${deliveryCost.toFixed(2)} delivery`}
              </span>
            </>
          )}
        </InfoRow>

        <Tags aria-label="Cuisines">
          {cuisines.slice(0, 6).map(cuisine => (
            <span key={cuisine.uniqueName}>{cuisine.name}</span>
          ))}
        </Tags>

        {deals && deals.length > 0 && (
          <Section>
            <SectionTitle>Deals & Promotions</SectionTitle>
            {deals.map((deal, i) => (
              <DealChip key={i}>{deal.description}</DealChip>
            ))}
          </Section>
        )}

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
      </Wrapper>
    </ErrorBoundary>
  );
};

export default RestaurantDetailsWithErrorHandling;
