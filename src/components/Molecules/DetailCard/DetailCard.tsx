// src/components/Molecules/RestaurantCard.tsx
import React from 'react';
import styled from 'styled-components';
import { highlightMatch } from '@/components/utils/highlightMatch';

interface RestaurantCardProps {
  heroUrl?: string;        // main banner / food photo
  logoUrl?: string;
  name: string;
  highlight?: string;
  rating: number;
  reviewCount: string;
  deliveryTime: string;
  deliveryFee: string;
  offer?: string;          // e.g. "Cheeky Tuesday • 20% off"
  badge?: 'Sponsored' | 'StampCard' | null;
  onClick?: () => void;
}

/* --------- Styled blocks --------- */

const Card = styled.div`
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(25, 40, 70, 0.06);
  overflow: hidden;
  margin: 0.7rem 0;
  min-width: 280px;
  cursor: pointer;
  transition: box-shadow .2s;

  &:hover {
    box-shadow: 0 8px 28px rgba(25, 40, 70, 0.13);
  }
`;

const TopWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;

  img.banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OfferRibbon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #fff4d9;
  color: #6a4600;
  font-weight: 600;
  font-size: 0.86rem;
  padding: 4px 10px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);

  svg {
    flex-shrink: 0;
  }
`;

const Badge = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: #111;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  opacity: 0.9;
`;

const Logo = styled.img`
  position: absolute;
  bottom: 10px;
  left: 12px;
  width: 70px;
  height: 70px;
  object-fit: contain;
  background: #fff;
  border-radius: 12px;
  border: 2px solid #eee;
`;

const Body = styled.div`
  padding: 1.1rem 1.1rem 0.9rem;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 .45rem;
`;

const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  color: #606770;
  font-size: 1rem;
  margin-bottom: .4rem;
  gap: .5em;

  .star { color: #f5a623; }
  .clock{ font-size: 1em; }
`;

const DeliveryRow = styled.div`
  display: flex;
  align-items: center;
  gap: .5em;
  font-size: 1.05rem;
  font-weight: 500;
  color: #222;
`;

/* ---------- SVG helper ---------- */
const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff8000">
    <path d="M21.586 11.586l-9.172-9.172a2.002 2.002 0 0 0-1.414-.586h-7a2 2 0 0 0-2 2v7c0 .53.211 1.039.586 1.414l9.172 9.172a2 2 0 0 0 2.828 0l7-7a2 2 0 0 0 0-2.828zM7.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg>
);

/* ========== Component ========== */
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
  onClick
}) => (
  <Card onClick={onClick}>
    <TopWrapper>
      {/* banner */}
      {heroUrl && <img className="banner" src={heroUrl} alt={`${name} banner`} />}

      {/* offer ribbon */}
      {offer && (
        <OfferRibbon>
          <TagIcon />
          {offer}
        </OfferRibbon>
      )}

      {/* restaurant logo */}
      {logoUrl && <Logo src={logoUrl} alt={`${name} logo`} />}

      {/* badge bottom-right */}
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

      <DeliveryRow>
        🚴‍♂️ Delivery from {deliveryFee}
      </DeliveryRow>
    </Body>
  </Card>
);

export default RestaurantCard;