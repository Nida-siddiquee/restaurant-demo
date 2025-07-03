import styled from 'styled-components';

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

export const MapWrapper = styled.div`
  width: 100%;
  min-height: 180px;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 600px) {
    min-height: 120px;
  }
`;
