
import styled from 'styled-components';

const PrimaryButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, rgb(243, 97, 0), rgb(248, 143, 51));
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 112, 243, 0.3);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.3s ease;

  &:hover:enabled {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 112, 243, 0.35);
    background: linear-gradient(135deg, rgb(248, 143, 51), rgb(243, 97, 0));
  }

  &:active:enabled {
    transform: translateY(0);
    box-shadow: 0 3px 6px rgba(0, 112, 243, 0.25);
  }

  &:disabled {
    background: #a0aec0;
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.7;
    
  }
`;

export default PrimaryButton;