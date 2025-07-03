import React from 'react';
import { SortOption } from '@/utils/sorting';
import { SortingDropdownProps } from './types';
import { SortContainer, StyledSelect } from './SortingDropdown.styled';

const SortingDropdown: React.FC<SortingDropdownProps> = ({ value, onChange }) => {
  return (
    <SortContainer>
      <StyledSelect
        id="sort-options"
        value={value}
        onChange={e => onChange(e.target.value as SortOption)}
        aria-label="Sort restaurants by"
      >
        <option value={SortOption.NONE}>Default</option>
        <option value={SortOption.RATING_HIGH_TO_LOW}>Rating (Highest first)</option>
        <option value={SortOption.DELIVERY_COST_LOW_TO_HIGH}>Delivery cost (Lowest first)</option>
        <option value={SortOption.MIN_ORDER_LOW_TO_HIGH}>Min. order amount (Lowest first)</option>
        <option value={SortOption.DISTANCE_NEAR_TO_FAR}>Distance (Nearest first)</option>
      </StyledSelect>
    </SortContainer>
  );
};

export default SortingDropdown;
