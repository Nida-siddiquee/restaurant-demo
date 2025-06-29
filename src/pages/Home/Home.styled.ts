import styled from 'styled-components';

export const Page = styled.div`
  max-width: 1440px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const FlexWrap = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

// Legacy styles kept for compatibility with existing components
export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Card = styled.div`
  background: var(--color-card-bg);
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h3`
  margin: 0;
  padding: 1rem;
  font-size: 1.25rem;
  background: var(--color-primary);
  color: white;
`;

export const Body = styled.div`
  padding: 1rem;
  flex: 1;
`;

export const Address = styled.p`
  margin: 0.5rem 0;
  color: #555;
  font-size: 0.9rem;
`;

export const Rating = styled.span`
  font-weight: bold;
  color: #f5a623;
`;

export const Button = styled.button`
  margin: 1rem;
  background: var(--color-primary);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: var(--color-primary-dark);
  }
`;

export const ErrorMsg = styled.p`
  color: red;
  text-align: center;
`;
