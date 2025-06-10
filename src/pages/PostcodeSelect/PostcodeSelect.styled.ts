import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    max-width: 95vw;
    padding: 1.25rem 0.75rem;
    margin: 2rem auto;
    border-radius: 10px;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(90deg, rgb(243, 97, 0), rgb(248, 143, 51));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 2px;
  border: 2px solid #e2e8f0;
  background: url("data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a828e' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E")
    no-repeat right 1rem center;
  appearance: none;
  outline: none;
  margin-bottom: 1.5rem;
  transition: border-color 0.2s ease;

  &:focus,
  &:active {
    border-color: #ed9036;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.6rem 0.7rem;
    margin-bottom: 1rem;
  }
`;
