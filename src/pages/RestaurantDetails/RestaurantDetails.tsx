import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState, AppDispatch } from '@/app/store';
import {
  selectRestaurant,
  fetchRestaurantsRequest,
} from '@/features/restaurants/restaurantsSlice';

import PrimaryButton from '@/components/Atoms/PrimaryButton';

const Wrapper = styled.div`
  max-width: 960px;
  margin: 1rem auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Hero = styled.div`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  height: 260px;

  img.hero {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img.logo {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    width: 90px;
    height: 90px;
    object-fit: contain;
    border-radius: 12px;
    background: #fff;
    border: 2px solid #eee;
  }
`;

const Name = styled.h1`
  font-size: 2rem;
  margin: 0.2rem 0;
`;

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 1.05rem;
  color: #606770;

  .star { color: #f5a623; }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;

  span {
    background: #f5f5f5;
    padding: 4px 10px;
    border-radius: 40px;
    font-size: .85rem;
    font-weight: 600;
  }
`;

const Section = styled.section`
  background: var(--color-card-bg);
  border-radius: 16px;
  padding: 1.5rem 1.2rem;
  box-shadow: 0 4px 16px rgba(25, 40, 70, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: .8rem;
`;

const DealChip = styled.span`
  display: inline-block;
  background: #fff4d9;
  color: #6a4600;
  font-size: .85rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 40px;
  margin-right: .6rem;
  margin-bottom: .6rem;
`;

const BackLink = styled(Link)`
  color: var(--color-primary);
  margin-bottom: .4rem;
`;

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data, loading } = useSelector((s: RootState) => s.restaurants);
  const restaurant = data?.restaurants.find(r => r.id === id);
const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80';

  // If user hit detail directly (refresh), ensure restaurants are loaded
  useEffect(() => {
    if (!restaurant && !loading) {
      // fallback: fetch using last selected postcode
      const postcode = (s: RootState) => s.postcodes.selected?.code;
      // @ts-ignore – quick access to store
      const pc = (dispatch as any).getState()?.postcodes?.selected?.code;
      if (pc) dispatch(fetchRestaurantsRequest(pc));
      else navigate('/');
    } else {
      dispatch(selectRestaurant(id!));
    }
  }, [dispatch, id, restaurant, loading, navigate]);

  if (loading || !restaurant) return <p style={{ textAlign: 'center' }}>Loading…</p>;

  const {
    logoUrl,
    name,
    rating,
    cuisines = [],
    deliveryEtaMinutes,
    deliveryCost,
    address,
    deals,
  } = restaurant;

  return (
    <Wrapper>
      <BackLink to="/restaurants">← Back to list</BackLink>

      <Hero>
        
          <img src={FALLBACK_HERO} alt={`${name} banner`} className="hero" />
       
        {logoUrl && <img src={logoUrl} alt={`${name} logo`} className="logo" />}
      </Hero>

      <Name>{name}</Name>

      <InfoRow>
        <span className="star">★</span>
        {rating?.starRating ?? 0} ({rating?.count ?? 0})
        {deliveryEtaMinutes && (
          <>
            • 🕒 {deliveryEtaMinutes.rangeLower}-{deliveryEtaMinutes.rangeUpper} min
          </>
        )}
        {deliveryCost !== undefined && (
          <>
            • 💷 £{deliveryCost.toFixed(2)} delivery
          </>
        )}
      </InfoRow>

      <Tags>
        {cuisines.slice(0, 6).map(c => (
          <span key={c.uniqueName}>{c.name}</span>
        ))}
      </Tags>

      {!!deals?.length && (
        <Section>
          <SectionTitle>Deals & Promotions</SectionTitle>
          {deals.map((d, i) => (
            <DealChip key={i}>{d.description || d.offerType}</DealChip>
          ))}
        </Section>
      )}

      {address && (
        <Section>
          <SectionTitle>Address</SectionTitle>
          <p>
            {address.firstLine} <br />
            {address.city} {address.postalCode}
          </p>
        </Section>
      )}

      {/* CTA – adapt to real order flow later */}
      <PrimaryButton style={{ width: '220px', alignSelf: 'center' }}>
        Order Now
      </PrimaryButton>
    </Wrapper>
  );
};

export default RestaurantDetailPage;