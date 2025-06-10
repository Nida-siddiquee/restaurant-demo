import styled from 'styled-components';

const PrimaryButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, rgb(243, 97, 0), rgb(248, 143, 51));
  border: none;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 112, 243, 0.3);

  &:hover:enabled {
    background: linear-gradient(135deg, rgb(248, 143, 51), rgb(243, 97, 0));
  }

  &:active:enabled {
    /* No animation; just keep it visually the same as hover or add a slight color shift if you want */
  }

  &:disabled {
    background: #a0aec0;
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default PrimaryButton;
