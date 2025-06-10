import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { Page, Title, Grid, ErrorMsg, SubHeading } from './Home.styled';

import {
  selectRestaurant,
  setSearchQuery,
  setCurrentPage,
} from '@/features/restaurants/restaurantsSlice';

import { RootState, AppDispatch } from '@/app/store';
import Pagination from '@/components/Organisims/Pagination/Pagination';
import RestaurantCard from '@/components/Molecules/DetailCard';
import SearchBox from '@/components/Atoms/SearchBox';

const RESTAURANTS_PER_PAGE = 30;

const RestaurantsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data, loading, error, searchQuery, currentPage } = useSelector(
    (state: RootState) => state.restaurants,
  );
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [currentPage]);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [debouncedQuery] = useDebounce(searchInput, 300);

  useEffect(() => {
    if (debouncedQuery !== searchQuery) {
      dispatch(setSearchQuery(debouncedQuery));
    }
  }, [debouncedQuery, searchQuery, dispatch]);

  const filteredRestaurants = useMemo(() => {
    const list = data?.restaurants ?? [];
    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.address?.city?.toLowerCase().includes(q) ||
        (r.cuisines ?? []).some(c => c.name.toLowerCase().includes(q)),
    );
  }, [data?.restaurants, searchQuery]);

  const totalPages = Math.ceil(filteredRestaurants.length / RESTAURANTS_PER_PAGE);
  const startIdx = (currentPage - 1) * RESTAURANTS_PER_PAGE;
  const pageSlice = filteredRestaurants.slice(startIdx, startIdx + RESTAURANTS_PER_PAGE);

  const handleDetails = (id: string) => {
    dispatch(selectRestaurant(id));
    navigate(`/restaurants/${id}`);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Page>
      <Title>Available Restaurants</Title>

      {/* Loading / Error states */}
      {loading && <p>Loading restaurants…</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* Search Box */}
      <SearchBox
        value={searchInput}
        onChange={setSearchInput}
        onClear={() => setSearchInput('')}
        placeholder="Search by name, location, cuisine…"
      />

      {/* Count */}
      <SubHeading>
        Order from {filteredRestaurants.length} place
        {filteredRestaurants.length !== 1 && 's'}
      </SubHeading>

      {/* No results */}
      {!loading && !error && filteredRestaurants.length === 0 && (
        <p>No restaurants found for this search.</p>
      )}

      {/* Grid of cards */}
      <Grid>
        {pageSlice.map(r => (
          <RestaurantCard
            logoUrl={r.logoUrl}
            name={r.name}
            highlight={debouncedQuery}
            rating={r.rating?.starRating ?? 0}
            reviewCount={r.rating?.count?.toLocaleString() ?? '0'}
            deliveryTime={
              r.deliveryEtaMinutes
                ? `${r.deliveryEtaMinutes.rangeLower}-${r.deliveryEtaMinutes.rangeUpper} min`
                : 'N/A'
            }
            deliveryFee={r.deliveryCost !== undefined ? `£${r.deliveryCost.toFixed(2)}` : 'N/A'}
            offer={r.deals?.[0]?.description || undefined} // show first deal
            badge={
              r.isPremier
                ? 'Sponsored'
                : r.deals?.some(d => d.offerType === 'StampCard')
                  ? 'StampCard'
                  : null
            }
            onClick={() => handleDetails(r.id)}
          />
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      )}
    </Page>
  );
};

export default RestaurantsListPage;
