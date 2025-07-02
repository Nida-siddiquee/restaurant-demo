import styled from 'styled-components';

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const SortLabel = styled.label`
  margin-right: 8px;
  font-size: 14px;
  color: #333;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 14px;
  flex: 1;
  min-width: 0;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;
