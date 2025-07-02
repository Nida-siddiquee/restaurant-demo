import styled from 'styled-components';


export const InlineContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin: 0.5rem 0;
  color: #991b1b;
  font-size: 0.875rem;
`;

export const Icon = styled.span`
  margin-right: 0.5rem;
  font-size: 1rem;
`;

export const Message = styled.span`
  flex: 1;
`;

export const RetryButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  padding: 0;

  &:hover {
    color: #991b1b;
  }

  &:focus {
    outline: 2px solid #dc2626;
    outline-offset: 2px;
  }
`;
