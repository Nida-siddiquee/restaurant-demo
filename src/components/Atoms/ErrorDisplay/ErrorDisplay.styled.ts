import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(25, 40, 70, 0.06);
  margin: 1rem;
  max-width: 500px;
  margin: 1rem auto;
`;

export const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

export const Message = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ErrorDetails = styled.details`
  margin-top: 1rem;
  text-align: left;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;

  summary {
    cursor: pointer;
    font-weight: 600;
    color: #666;
    margin-bottom: 0.5rem;
  }

  pre {
    background: #fff;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    overflow-x: auto;
    margin-top: 0.5rem;
  }
`;
