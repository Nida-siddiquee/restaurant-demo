import styled from 'styled-components';

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const SortLabel = styled.label`
  font-weight: 500;
  margin-right: 8px;
  color: #333;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover, &:focus {
    border-color: #0066cc;
    outline: none;
  }
`;

