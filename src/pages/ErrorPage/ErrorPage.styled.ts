import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ErrorIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    font-size: 2.5rem;
    margin-bottom: 0.7rem;
  }
`;

export const Wrapper = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: 2rem 1rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0.5rem 0 0.7rem 0;
  letter-spacing: -1px;
  background: linear-gradient(90deg, #ff8000, #ffb366);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export const Message = styled.p`
  font-size: 1.15rem;
  color: #484f56;
  max-width: 420px;
  margin: 0 0 2.5rem 0;
  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 1.3rem;
  }
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #ff8000, #ffb366);
  color: #fff;
  font-weight: 600;
  padding: 0.85rem 2.1rem;
  border-radius: 2px;
  font-size: 1.08rem;
  box-shadow: 0 4px 12px rgba(255, 128, 0, 0.09);
  text-decoration: none;
  transition:
    background 0.18s,
    box-shadow 0.18s,
    transform 0.14s;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #ffb366, #ff8000);
    box-shadow: 0 8px 24px rgba(255, 128, 0, 0.13);
    transform: translateY(-2px);
  }
`;
