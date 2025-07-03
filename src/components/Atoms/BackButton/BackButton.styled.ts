import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledBackLink = styled(Link)`
  color: var(--color-primary);
  margin-bottom: 0.4rem;
  font-size: 1rem;
  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;
