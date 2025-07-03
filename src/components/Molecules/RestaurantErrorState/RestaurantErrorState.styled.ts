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
