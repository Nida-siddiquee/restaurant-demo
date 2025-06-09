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
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(90deg,rgb(243, 97, 0), rgb(248, 143, 51));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  background: url("data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a828e' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E")
    no-repeat right 1rem center;
  appearance: none;
  outline: none;
  margin-bottom: 1.5rem;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: rgb(243, 97, 0);
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, rgb(243, 97, 0),rgb(248, 143, 51));
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 112, 243, 0.3);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 112, 243, 0.35);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 6px rgba(0, 112, 243, 0.25);
  }

  &:disabled {
    background: #a0aec0;
    box-shadow: none;
    cursor: not-allowed;
  }
`;
