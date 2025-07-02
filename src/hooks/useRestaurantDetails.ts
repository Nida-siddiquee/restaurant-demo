import { useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { selectRestaurant, fetchRestaurantsRequest } from '@/features/restaurants/restaurantsSlice';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const useSelectedPostcode = () => useSelector((state: RootState) => state.postcodes.selected?.code);

export const useRestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const hasAttemptedSelection = useRef<string | null>(null);
  const postcode = useSelectedPostcode();
  const { selected, loading, error } = useSelector((s: RootState) => s.restaurants);

  const handleError = useCallback((err: import('@/utils/errors').CustomError) => {
    console.error('Error in RestaurantDetails:', err);
  }, []);

  const { 
    error: handlingError, 
    executeWithErrorHandling, 
    clearError 
  } = useErrorHandler({
    maxRetries: 2,
    onError: handleError,
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
      }
    };

    initializeRestaurant();
  }, [dispatch, id, navigate, postcode, selected, executeWithErrorHandling]);

  // Separate useEffect for restaurant selection to avoid infinite loops
  useEffect(() => {
    if (id && selected && id !== selected.id && hasAttemptedSelection.current !== id) {
      hasAttemptedSelection.current = id;
      executeWithErrorHandling(async () => {
        dispatch(selectRestaurant(id));
      }, { action: 'select_restaurant', restaurantId: id });
    }
  }, [id, selected, dispatch, executeWithErrorHandling]);

  // Reset the attempted selection ref when id changes
  useEffect(() => {
    hasAttemptedSelection.current = null;
  }, [id]);

  // Separate useEffect for scrolling
  useEffect(() => {
    if (pageRef.current && selected) {
      pageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selected]);

  const handleRetry = useCallback(async () => {
    clearError();
    if (postcode) {
      await executeWithErrorHandling(async () => {
        dispatch(fetchRestaurantsRequest(postcode));
      }, { action: 'retry_fetch_restaurants', postcode, restaurantId: id });
    }
  }, [clearError, executeWithErrorHandling, dispatch, postcode, id]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return {
    id,
    pageRef,
    postcode,
    selected,
    loading,
    error,
    handlingError,
    handleRetry,
    handleGoHome,
  };
};
