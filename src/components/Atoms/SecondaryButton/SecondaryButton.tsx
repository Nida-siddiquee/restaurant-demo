import styled from 'styled-components';

const SecondaryButton = styled.button`
  padding: 0.7rem 1.6rem;
  border-radius: 2px;
  font-size: 1.17rem;
  font-weight: 700;
  background: #fff;
  border: 1.7px solid #e4e4e4;
  color: #23292e;
  cursor: pointer;
  transition:
    border 0.15s,
    color 0.15s,
    background 0.18s;
  margin-top: 0.6rem;
  box-shadow: 0 1px 8px rgba(50, 50, 50, 0.03);
  &:hover {
    border-color: #ff8000;
    color: #ff8000;
    background: #fff7f0;
  }
`;

export default SecondaryButton;
