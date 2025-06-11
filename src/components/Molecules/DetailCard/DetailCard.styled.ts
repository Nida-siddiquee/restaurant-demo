import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(25, 40, 70, 0.06);
  overflow: hidden;
  margin: 0.7rem 0;
  min-width: 220px;
  cursor: pointer;
  transition: box-shadow .2s;

  &:hover {
    box-shadow: 0 8px 28px rgba(25, 40, 70, 0.13);
  }

  @media (max-width: 600px) {
    min-width: 0;
    margin: 0.6rem 0 1rem 0;
    border-radius: 9px;
  }
`;

export const TopWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;

  img.banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    height: 90px;
  }
`;

export const OfferRibbon = styled.div`
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

  @media (max-width: 600px) {
    top: 6px;
    left: 6px;
    font-size: 0.76rem;
    padding: 3px 8px;
  }
`;

export const Badge = styled.div`
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

  @media (max-width: 600px) {
    bottom: 6px;
    right: 6px;
    font-size: 0.67rem;
    padding: 2px 7px;
  }
`;

export const Logo = styled.img`
  position: absolute;
  bottom: 10px;
  left: 12px;
  width: 70px;
  height: 70px;
  object-fit: contain;
  background: #fff;
  border-radius: 12px;
  border: 2px solid #eee;

  @media (max-width: 600px) {
    width: 42px;
    height: 42px;
    bottom: 6px;
    left: 6px;
    border-radius: 7px;
    border-width: 1.2px;
  }
`;

export const Body = styled.div`
  padding: 1.1rem 1.1rem 0.9rem;

  @media (max-width: 600px) {
    padding: 0.7rem 0.7rem 0.55rem;
  }
`;

export const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 .45rem;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 0.28rem;
  }
`;

export const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  color: #606770;
  font-size: 1rem;
  margin-bottom: .4rem;
  gap: .5em;

  .star { color: #f5a623; }
  .clock{ font-size: 1em; }

  @media (max-width: 600px) {
    font-size: 0.88rem;
    gap: 0.33em;
    margin-bottom: 0.22rem;
  }
`;

export const DeliveryRow = styled.div`
  display: flex;
  align-items: center;
  gap: .5em;
  font-size: 1.05rem;
  font-weight: 500;
  color: #222;

  @media (max-width: 600px) {
    font-size: 0.90rem;
    gap: 0.32em;
  }
`;