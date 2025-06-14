import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@/app/store';
import MapView from '@/components/Atoms/MapView';
import LoadingScreen from '@/components/Molecules/LoadingScreen';
import ErrorPage from '@/pages/ErrorPage';
import { selectRestaurant, fetchRestaurantsRequest } from '@/features/restaurants/restaurantsSlice';
import {
  Wrapper,
  BackLink,
  Hero,
  Name,
  InfoRow,
  Tags,
  Section,
  SectionTitle,
  DealChip,
  MapWrapper,
} from './RestaurantDetails.styled';

const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80';

const useSelectedPostcode = () => useSelector((state: RootState) => state.postcodes.selected?.code);

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const postcode = useSelectedPostcode();
  const { selected, loading, error } = useSelector((s: RootState) => s.restaurants);

  useEffect(() => {
    if (!selected) {
      if (postcode) {
        dispatch(fetchRestaurantsRequest(postcode));
      } else {
        navigate('/');
      }
    } else if (id && selected && id !== selected.id) {
      dispatch(selectRestaurant(id));
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !selected) {
    return (
      <Wrapper>
        <ErrorPage />
      </Wrapper>
    );
  }
  const {
    logoUrl,
    name,
    rating,
    cuisines = [],
    deliveryEtaMinutes,
    deliveryCost,
    address,
    deals,
  } = selected;
  const [lng, lat] = address.location.coordinates;

  return (
    <Wrapper>
      <BackLink to="/restaurants">← Back to list</BackLink>

      <Hero>
        <img src={FALLBACK_HERO} alt={`${name} banner image`} className="hero" />
        {logoUrl && <img src={logoUrl} alt={`${name} logo`} className="logo" />}
      </Hero>

      <Name data-testid="restaurant-name">{name}</Name>

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
        {typeof deliveryCost === 'number' && (
          <>
            {' '}
            • <span aria-label="Delivery cost">💷 £{deliveryCost.toFixed(2)} delivery</span>
          </>
        )}
      </InfoRow>

      <Tags aria-label="Cuisines">
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
          <address>
            {address.firstLine}
            <br />
            {address.city} {address.postalCode}
          </address>
          <MapWrapper>
            <MapView latitude={lat} longitude={lng} />
          </MapWrapper>
        </Section>
      )}
    </Wrapper>
  );
};

export default RestaurantDetailPage;
