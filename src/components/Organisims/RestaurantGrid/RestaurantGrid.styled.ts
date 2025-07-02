import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  /* Ensure consistent card widths across breakpoints */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const GridItem = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 320px; /* Ensure minimum height for consistency */

  @media (max-width: 600px) {
    min-height: 280px;
  }
`;
