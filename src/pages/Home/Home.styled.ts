import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0059c1;
  }
`;
