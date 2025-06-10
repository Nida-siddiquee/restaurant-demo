import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce'; // <--- Add this
import { useNavigate } from 'react-router-dom';
import { Page, Title, Grid, ErrorMsg } from './Home.styled';
import {
  fetchRestaurantsRequest,
  selectRestaurant,
  setSearchQuery,
} from '@/features/restaurants/restaurantsSlice';
import { RootState, AppDispatch } from '@/app/store';
import Pagination from '@/components/Organisims/Pagination/Pagination';
import RestaurantCard from '@/components/Molecules/DetailCard';

const RESTAURANTS_PER_PAGE = 30;

const RestaurantsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const selectedPostcode = useSelector((state: RootState) => state.postcodes.selected?.code);
  const { data, loading, error } = useSelector((state: RootState) => state.restaurants);
  const searchQuery = useSelector((state: RootState) => state.restaurants.searchQuery);

  // Local search input (debounced)
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [debouncedQuery] = useDebounce(searchInput, 300);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  // Filter restaurants with debounced query
  const filteredRestaurants = (data?.restaurants ?? []).filter(
    r =>
      r.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      r.address?.city?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      (r.cuisines || []).some(c => c.name.toLowerCase().includes(debouncedQuery.toLowerCase())),
  );

  // Pagination logic as before...
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => setCurrentPage(1), [debouncedQuery]);
  const totalPages = Math.ceil(filteredRestaurants.length / RESTAURANTS_PER_PAGE);
  const startIdx = (currentPage - 1) * RESTAURANTS_PER_PAGE;
  const currentRestaurants = filteredRestaurants.slice(startIdx, startIdx + RESTAURANTS_PER_PAGE);

  const handleDetails = (id: string) => {
    dispatch(selectRestaurant(id));
    navigate(`/restaurants/${id}`);
  };

  return (
    <Page>
      <Title>Available Restaurants</Title>
      {loading && <p>Loading restaurants…</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {!loading && !error && filteredRestaurants.length === 0 && <p>No restaurants found for this search.</p>}
      <input
        type="text"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        placeholder="Search by name, location, cuisine…"
        style={{ width: 300, marginBottom: 16, fontSize: '1rem' }}
      />
      <Grid>
        {currentRestaurants.map(r => (
          <RestaurantCard
            key={r.id}
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
            onClick={() => handleDetails(r.id)}
          />
        ))}
      </Grid>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Page>
  );
};

export default RestaurantsListPage;