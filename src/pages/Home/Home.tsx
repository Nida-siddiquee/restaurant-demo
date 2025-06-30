import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/app/store';
import { Page, FlexWrap } from './Home.styled';
import ErrorPage from '../ErrorPage';
import {
  selectRestaurant,
  setSearchQuery,
  setCurrentPage,
  resetFilters,
} from '@/features/restaurants/restaurantsSlice';
import HomeContent from '@/components/Organisims/HomeContent';
import { useFilteredRestaurants, usePagination } from './hooks';
import LoadingScreen from '@/components/Molecules/LoadingScreen';
import MobileFilterBar from '@/components/Organisims/MobileFilterBar';
import FiltersSidebarDrawer from '@/components/Molecules/Sidebar/FiltersSidebarDrawer';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const previousPostcodeRef = useRef<string | null>(null);
  const { data, loading, error, searchQuery, currentPage, activeFilters } = useSelector(
    (state: RootState) => state.restaurants,
  );
  const { selected: selectedPostcode } = useSelector((state: RootState) => state.postcodes);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [debouncedQuery] = useDebounce(searchInput, 300);
  const filteredRestaurants = useFilteredRestaurants(data?.restaurants, searchQuery, activeFilters);
  const { totalPages, pageSlice } = usePagination(filteredRestaurants, currentPage);
  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

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

  const handleDetails = (id: string) => {
    dispatch(selectRestaurant(id));
    navigate(`/restaurants/${id}`);
  };
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const handleClearFilters = () => {
    dispatch(resetFilters());
  };
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };
  const handleSearchClear = () => {
    setSearchInput('');
  };
  if (error) {
    return (
      <Page ref={pageRef}>
        <ErrorPage />
      </Page>
    );
  }
  return (
    <Page ref={pageRef}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <FlexWrap>
          <MobileFilterBar
            hasActiveFilters={hasActiveFilters}
            onFilterClick={() => setDrawerOpen(true)}
            onClearFilters={handleClearFilters}
          />
          <FiltersSidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
          <HomeContent
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
            onSearchClear={handleSearchClear}
            filteredRestaurants={filteredRestaurants}
            pageSlice={pageSlice}
            searchQuery={debouncedQuery}
            loading={loading}
            error={error}
            totalPages={totalPages}
            currentPage={currentPage}
            onRestaurantClick={handleDetails}
            onPageChange={handlePageChange}
            onClearFilters={handleClearFilters}
          />
        </FlexWrap>
      )}
    </Page>
  );
};
export default Home;
