import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/app/store';
import { Page, FlexWrap } from './Home.styled';
import ErrorDisplay from '@/components/Atoms/ErrorDisplay';
import InlineError from '@/components/Atoms/InlineError';
import ErrorBoundary from '@/components/Atoms/ErrorBoundary';
import {
  selectRestaurant,
  setSearchQuery,
  setCurrentPage,
  resetFilters,
  fetchRestaurantsRequest,
  setSortOption,
} from '@/features/restaurants/restaurantsSlice';
import HomeContent from '@/components/Organisims/HomeContent';
import { useFilteredRestaurants, usePagination, useErrorHandler, useSortedRestaurants } from '@/hooks';
import LoadingScreen from '@/components/Molecules/LoadingScreen';
import MobileFilterBar from '@/components/Organisims/MobileFilterBar';
import FiltersSidebarDrawer from '@/components/Molecules/Sidebar/FiltersSidebarDrawer';
import { createNetworkError, ErrorType } from '@/utils/errors';
import { SortOption } from '@/utils/sorting';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const previousPostcodeRef = useRef<string | null>(null);
  const { data, loading, error, searchQuery, currentPage, activeFilters, sortOption } = useSelector(
    (state: RootState) => state.restaurants,
  );
  const { selected: selectedPostcode } = useSelector((state: RootState) => state.postcodes);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [debouncedQuery] = useDebounce(searchInput, 300);
  const filteredRestaurants = useFilteredRestaurants(data?.restaurants, searchQuery, activeFilters);
  const sortedRestaurants = useSortedRestaurants(filteredRestaurants, sortOption);
  const { totalPages, pageSlice } = usePagination(sortedRestaurants, currentPage);
  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  const { 
    error: handlingError, 
    isRetrying, 
    executeWithErrorHandling, 
    retry, 
    clearError 
  } = useErrorHandler({
    maxRetries: 3,
    retryDelay: 2000,
    onError: (err) => console.error('Error in Home component:', err),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);
  useEffect(() => {
    if (debouncedQuery !== searchQuery) {
      dispatch(setSearchQuery(debouncedQuery));
    }
  }, [debouncedQuery, searchQuery, dispatch]);

  useEffect(() => {
    const currentPostcodeCode = selectedPostcode?.code;

    if (
      previousPostcodeRef.current !== null &&
      previousPostcodeRef.current !== currentPostcodeCode &&
      hasActiveFilters
    ) {
      dispatch(resetFilters());
    }

    previousPostcodeRef.current = currentPostcodeCode || null;
  }, [selectedPostcode?.code, hasActiveFilters, dispatch]);

  const handleDetails = async (id: string) => {
    await executeWithErrorHandling(async () => {
      dispatch(selectRestaurant(id));
      navigate(`/restaurants/${id}`);
    }, { action: 'navigate_to_restaurant', restaurantId: id });
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleClearFilters = () => {
    clearError(); 
    dispatch(resetFilters());
  };

  const handleSearchChange = (value: string) => {
    clearError(); 
    setSearchInput(value);
  };

  const handleSearchClear = () => {
    clearError();
    setSearchInput('');
  };

  const handleRetryFetch = async () => {
    if (selectedPostcode?.code) {
      await executeWithErrorHandling(async () => {
        dispatch(fetchRestaurantsRequest(selectedPostcode.code));
      }, { action: 'fetch_restaurants', postcode: selectedPostcode.code });
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleSortChange = (option: SortOption) => {
    dispatch(setSortOption(option));
  };
  if (error && !loading) {
    const errorObj = createNetworkError(error);
    errorObj.retryable = true;
    
    return (
      <Page ref={pageRef}>
        <ErrorDisplay
          error={errorObj}
          onRetry={handleRetryFetch}
          onGoHome={handleGoHome}
          onReload={handleReload}
        />
      </Page>
    );
  }

  return (
    <ErrorBoundary>
      <Page ref={pageRef}>
        {handlingError && handlingError.type !== ErrorType.GENERIC_ERROR && (
          <InlineError error={handlingError} onRetry={retry} />
        )}
        
        {loading || isRetrying ? (
          <LoadingScreen />
        ) : (
          <FlexWrap>
            <MobileFilterBar
              hasActiveFilters={hasActiveFilters}
              onFilterClick={() => setDrawerOpen(true)}
              onClearFilters={handleClearFilters}
            />
            <FiltersSidebarDrawer 
              open={drawerOpen} 
              onClose={() => setDrawerOpen(false)} 
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
            <HomeContent
              searchInput={searchInput}
              onSearchChange={handleSearchChange}
              onSearchClear={handleSearchClear}
              filteredRestaurants={sortedRestaurants}
              pageSlice={pageSlice}
              searchQuery={debouncedQuery}
              loading={loading || isRetrying}
              error={error}
              totalPages={totalPages}
              currentPage={currentPage}
              onRestaurantClick={handleDetails}
              onPageChange={handlePageChange}
              onClearFilters={handleClearFilters}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </FlexWrap>
        )}
      </Page>
    </ErrorBoundary>
  );
};
export default Home;
