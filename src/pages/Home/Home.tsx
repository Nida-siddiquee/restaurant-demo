import React, { useEffect, useMemo, useState } from 'react';
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
import FiltersSidebar from '@/components/Molecules/FiltersSidebar';
import styled from 'styled-components';

const RESTAURANTS_PER_PAGE = 30;

const FlexWrap = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  padding: 0 1rem;
  @media (max-width: 490px) {
    padding: 0;
  }
`;

const RestaurantsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data, loading, error, searchQuery, currentPage, activeFilters } = useSelector(
    (state: RootState) => state.restaurants,
  );

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [debouncedQuery] = useDebounce(searchInput, 300);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  useEffect(() => {
    if (debouncedQuery !== searchQuery) {
      dispatch(setSearchQuery(debouncedQuery));
    }
  }, [debouncedQuery, searchQuery, dispatch]);

  const filteredRestaurants = useMemo(() => {
    let list = data?.restaurants ?? [];

    // Sidebar filter pipeline
    const f = activeFilters ?? {};
    if (f.free_delivery) list = list.filter(r => r.deliveryCost === 0);
    if (f.open_now) list = list.filter(r => r.isOpenNowForDelivery);
    if (f.with_discounts) list = list.filter(r => (r.deals?.length ?? 0) > 0);
    if (f.collection) list = list.filter(r => r.isCollection);
    if (f.new) list = list.filter(r => r.isNew);
    if (f['four_star']) list = list.filter(r => (r.rating?.starRating ?? 0) >= 4);

    // Search
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.address?.city?.toLowerCase().includes(q) ||
        (r.cuisines ?? []).some(c => c.name.toLowerCase().includes(q)),
    );
  }, [data?.restaurants, searchQuery, activeFilters]);

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
      <FlexWrap>
        <FiltersSidebar />
        <Content>
          <Title>Available Restaurants</Title>
          {loading && <p>Loading restaurants…</p>}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <SearchBox
            value={searchInput}
            onChange={setSearchInput}
            onClear={() => setSearchInput('')}
            placeholder="Search by name, location, cuisine…"
          />
          <SubHeading>
            Order from {filteredRestaurants.length} place
            {filteredRestaurants.length !== 1 && 's'}
          </SubHeading>
          {!loading && !error && filteredRestaurants.length === 0 && (
            <p>No restaurants found for this search.</p>
          )}
          <Grid>
            {pageSlice.map(r => (
              <RestaurantCard
                logoUrl={r.logoUrl}
                key={r.id}
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
                offer={r.deals?.[0]?.description || undefined}
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
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          )}
        </Content>
      </FlexWrap>
    </Page>
  );
};

export default RestaurantsListPage;
