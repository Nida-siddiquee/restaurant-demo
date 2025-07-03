import React from 'react';
import styled from 'styled-components';

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    background: #f5f5f5;
    padding: 4px 10px;
    border-radius: 40px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    gap: 0.25rem;
    span {
      font-size: 0.78rem;
      padding: 2px 7px;
    }
  }
`;

interface RestaurantTagsProps {
  cuisines?: Array<{
    name: string;
    uniqueName: string;
  }>;
}

const RestaurantTags: React.FC<RestaurantTagsProps> = ({ cuisines = [] }) => {
  if (cuisines.length === 0) return null;

  return (
    <Tags aria-label="Cuisines">
      {cuisines.slice(0, 6).map(cuisine => (
        <span key={cuisine.uniqueName}>{cuisine.name}</span>
      ))}
    </Tags>
  );
};

export default RestaurantTags;
