import React from 'react';
import styled from 'styled-components';

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 1.05rem;
  color: #606770;

  .star {
    color: #f5a623;
  }

  @media (max-width: 500px) {
    font-size: 0.92rem;
    gap: 0.6rem;
  }
`;

interface RestaurantInfoProps {
  rating?: {
    starRating: number;
    count: number;
  };
  deliveryEtaMinutes?: {
    rangeLower: number;
    rangeUpper: number;
  };
  deliveryCost?: number;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ 
  rating, 
  deliveryEtaMinutes, 
  deliveryCost 
}) => {
  return (
    <InfoRow>
      <span className="star" aria-label="Rating">
        ★
      </span>
      {rating?.starRating ?? 0} ({rating?.count ?? 0})
      {deliveryEtaMinutes && (
        <>
          {' '}
          •{' '}
          <span aria-label="Delivery time">
            🕒 {deliveryEtaMinutes.rangeLower}-{deliveryEtaMinutes.rangeUpper} min
          </span>
        </>
      )}
      {deliveryCost !== undefined && (
        <>
          {' '}
          •{' '}
          <span aria-label="Delivery cost">
            🚚 {deliveryCost === 0 ? 'Free delivery' : `£${deliveryCost.toFixed(2)} delivery`}
          </span>
        </>
      )}
    </InfoRow>
  );
};

export default RestaurantInfo;
