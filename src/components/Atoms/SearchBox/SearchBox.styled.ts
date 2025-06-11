import styled from 'styled-components';

const ICON_SIZE = 22;
const GAP = 8;
const LEFT_PAD = '1rem';

export const SearchIcon = styled.span`
  position: absolute;
  left: ${LEFT_PAD};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;

  svg {
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;
    fill: var(--color-text);
  }

  @media (max-width: 600px) {
    left: 10px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const ClearBtn = styled.button`
  position: absolute;
  right: ${LEFT_PAD};
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: ${ICON_SIZE - 2}px;
    height: ${ICON_SIZE - 2}px;
    stroke: var(--color-text);
    stroke-width: 2.5;
    stroke-linecap: round;
    transition: stroke 0.2s ease;
  }

  &:hover svg {
    stroke: var(--color-primary);
  }

  @media (max-width: 600px) {
    right: 8px;
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.85rem ${ICON_SIZE + GAP + 12}px 0.85rem ${ICON_SIZE + GAP + 12}px;
  font-size: 1rem;
  border-radius: 2px;
  border: 2px solid var(--color-border);
  background: var(--color-card-bg);
  color: var(--color-text);

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.15);
    outline: none;
  }

  @media (max-width: 600px) {
    font-size: 0.96rem;
    padding: 0.7rem 32px 0.7rem 32px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
  margin: 0.75rem 0;

  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0.4rem 0;
  }
`;
