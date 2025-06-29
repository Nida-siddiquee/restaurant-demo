import React from 'react';
import { Content } from './HomeContent.styled';
import SearchAndHeading from '../SearchAndHeading/SearchAndHeading';
import RestaurantGrid from '../RestaurantGrid/RestaurantGrid';
import FiltersSidebar from '@/components/Molecules/Sidebar/FiltersSidebar';
import ClearFiltersEmptyState from '@/components/Atoms/ClearFiltersEmptyState';
import Pagination from '@/components/Organisims/Pagination/Pagination';
import { Restaurant } from '@/features/restaurants/types';

interface HomeContentProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  filteredRestaurants: Restaurant[];
  pageSlice: Restaurant[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  onRestaurantClick: (id: string) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

const HomeContent: React.FC<HomeContentProps> = ({
  searchInput,
  onSearchChange,
  onSearchClear,
  filteredRestaurants,
  pageSlice,
  searchQuery,
  loading,
  error,
  totalPages,
  currentPage,
  onRestaurantClick,
  onPageChange,
  onClearFilters,
}) => {
  return (
    <>
      <FiltersSidebar totalRestaurants={filteredRestaurants.length} />
      <Content>
        <SearchAndHeading
          searchInput={searchInput}
          onSearchChange={onSearchChange}
          onSearchClear={onSearchClear}
          restaurantCount={filteredRestaurants.length}
        />
        
        {!loading && !error && filteredRestaurants.length === 0 && (
          <ClearFiltersEmptyState onClear={onClearFilters} />
        )}

        <RestaurantGrid
          restaurants={pageSlice}
          searchQuery={searchQuery}
          onRestaurantClick={onRestaurantClick}
        />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={onPageChange}
          />
        )}
      </Content>
    </>
  );
};

export default HomeContent;
