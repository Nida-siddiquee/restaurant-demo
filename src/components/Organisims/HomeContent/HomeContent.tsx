import React from 'react';
import { Content } from './HomeContent.styled';
import SearchAndHeading from '../SearchAndHeading/SearchAndHeading';
import RestaurantGrid from '../RestaurantGrid/RestaurantGrid';
import FiltersSidebar from '@/components/Molecules/Sidebar/FiltersSidebar';
import ClearFiltersEmptyState from '@/components/Atoms/ClearFiltersEmptyState';
import Pagination from '@/components/Organisims/Pagination/Pagination';
import { HomeContentProps } from './types';

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
  sortOption,
  onSortChange,
}) => {
  return (
    <>
      <FiltersSidebar
        totalRestaurants={filteredRestaurants.length}
        sortOption={sortOption}
        onSortChange={onSortChange}
      />
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
