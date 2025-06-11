import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--color-primary)' : '#f2f2f2')};
  color: ${({ $active }) => ($active ? '#fff' : '#333')};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
