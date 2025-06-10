import { highlightMatch } from '@/utils/highlightMatch';
import React from 'react';
import styled from 'styled-components';

interface RestaurantCardProps {
  logoUrl?: string;
  name: string;
  highlight?: string;
  rating: number;
  reviewCount: string; // e.g. "1,900+"
  deliveryTime: string; // e.g. "15-30 min"
  deliveryFee: string; // e.g. "£0.99"
  onClick?: () => void; // Optional click handler
}

const Card = styled.div`
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(25, 40, 70, 0.06);
  overflow: hidden;
  margin: 0.7rem 0;
  min-width: 280px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 8px 28px rgba(25, 40, 70, 0.13);
  }
`;

const TopImageWrapper = styled.div`
  position: relative;
  height: 150px;
  width: 100%;
  overflow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

const Logo = styled.img`
  position: absolute;
  bottom: 10px;
  left: 12px;
  width: auto;
  height: auto;
  background: white;
  border-radius: 10px;
  object-fit: contain;
  border: 2px solid #eee;
`;

const Body = styled.div`
  padding: 1.1rem 1.1rem 0.8rem 1.1rem;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
`;

const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  color: #606770;
  font-size: 1rem;
  margin-bottom: 0.45rem;
  gap: 0.5em;

  .star {
    color: #f5a623;
    margin-right: 2px;
    font-size: 1em;
  }
  .clock {
    margin-right: 2px;
    font-size: 1em;
  }
`;

const DeliveryRow = styled.div`
  color: #222;
  font-size: 1.08rem;
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-weight: 500;
  .delivery {
    font-size: 1.1em;
    margin-right: 5px;
  }
`;
const RestaurantCard: React.FC<RestaurantCardProps> = ({
  logoUrl,
  name,
  highlight,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  onClick,
}) => (
  <Card onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <TopImageWrapper>{logoUrl && <Logo src={logoUrl} alt="restaurant logo" />}</TopImageWrapper>
    <Body>
      <Name>{highlightMatch(name, highlight ?? '')}</Name>
      <DetailsRow>
        <span className="star">★</span>
        {rating}
        <span style={{ fontSize: '0.93em', color: '#868686' }}>({reviewCount})</span>
        <span className="clock">🕒</span>
        {deliveryTime}
      </DetailsRow>
      <DeliveryRow>
        <span className="delivery">🚴‍♂️</span>
        Delivery from {deliveryFee}
      </DeliveryRow>
    </Body>
  </Card>
);
export default RestaurantCard;
