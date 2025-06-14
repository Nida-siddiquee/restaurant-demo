import { Link } from 'react-router-dom';
import styled from 'styled-components';
export const Wrapper = styled.div`
  max-width: 960px;
  margin: 1rem auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.2rem;

  @media (max-width: 700px) {
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

export const Hero = styled.div`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  height: 260px;

  img.hero {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
    box-shadow: 0 2px 8px rgba(25, 40, 70, 0.08);

    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
      left: 0.7rem;
      bottom: 0.7rem;
    }
  }

  @media (max-width: 600px) {
    height: 160px;
    border-radius: 12px;
  }
`;

export const Name = styled.h1`
  font-size: 2rem;
  margin: 0.2rem 0;

  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

export const InfoRow = styled.div`
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

export const Tags = styled.div`
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

export const Section = styled.section`
  background: var(--color-card-bg, #fff);
  border-radius: 16px;
  padding: 1.5rem 1.2rem;
  box-shadow: 0 4px 16px rgba(25, 40, 70, 0.05);
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    border-radius: 10px;
    padding: 1rem 0.6rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;

  @media (max-width: 600px) {
    font-size: 1.02rem;
    margin-bottom: 0.5rem;
  }
`;

export const DealChip = styled.span`
  display: inline-block;
  background: #fff4d9;
  color: #6a4600;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 40px;
  margin-right: 0.6rem;
  margin-bottom: 0.6rem;

  @media (max-width: 500px) {
    font-size: 0.75rem;
    padding: 2px 7px;
  }
`;

export const BackLink = styled(Link)`
  color: var(--color-primary);
  margin-bottom: 0.4rem;
  font-size: 1rem;
  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

export const MapWrapper = styled.div`
  width: 100%;
  min-height: 180px;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 600px) {
    min-height: 120px;
  }
`;
