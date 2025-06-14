import React from 'react';
import { highlightMatch } from '@/components/utils/highlightMatch';
import {
  Badge,
  Body,
  Card,
  DeliveryRow,
  DetailsRow,
  Logo,
  Name,
  OfferRibbon,
  TopWrapper,
} from './DetailCard.styled';

interface RestaurantCardProps {
  heroUrl?: string;
  logoUrl?: string;
  name: string;
  highlight?: string;
  rating: number;
  reviewCount: string;
  deliveryTime: string;
  deliveryFee: string;
  offer?: string;
  testId?: string;
  badge?: 'Sponsored' | 'StampCard' | null;
  onClick?: () => void;
}

const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff8000">
    <path d="M21.586 11.586l-9.172-9.172a2.002 2.002 0 0 0-1.414-.586h-7a2 2 0 0 0-2 2v7c0 .53.211 1.039.586 1.414l9.172 9.172a2 2 0 0 0 2.828 0l7-7a2 2 0 0 0 0-2.828zM7.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
);

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  heroUrl,
  logoUrl,
  name,
  highlight,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  offer,
  badge,
  testId,
  onClick,
}) => (
  <Card onClick={onClick} data-testid={testId} role="button" tabIndex={0}>
    <TopWrapper>
      {heroUrl && <img className="banner" src={heroUrl} alt={`${name} banner`} />}

      {offer && (
        <OfferRibbon>
          <TagIcon />
          {offer}
        </OfferRibbon>
      )}

      {logoUrl && <Logo src={logoUrl} alt={`${name} logo`} />}

      {badge && <Badge>{badge}</Badge>}
    </TopWrapper>

    <Body>
      <Name>{highlightMatch(name, highlight ?? '')}</Name>

      <DetailsRow>
        <span className="star">★</span>
        {rating} <span style={{ fontSize: '.9em', color: '#868' }}>({reviewCount})</span>
        <span className="clock">🕒</span>
        {deliveryTime}
      </DetailsRow>

      <DeliveryRow>🚴‍♂️ Delivery from {deliveryFee}</DeliveryRow>
    </Body>
  </Card>
);

export default RestaurantCard;
