import styled from 'styled-components';

export const SubHeading = styled.h3`
  text-align: left;
  margin-bottom: 1.5rem;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 800px) {
    display: block;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const SortLabel = styled.label`
  font-weight: 500;
  margin-right: 8px;
  color: #333;
  white-space: nowrap;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover,
  &:focus {
    border-color: #0066cc;
    outline: none;
  }
`;
