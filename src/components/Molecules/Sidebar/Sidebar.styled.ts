import styled from "styled-components";

export const Overlay = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  z-index: 1200;
  inset: 0;
  background: rgba(0,0,0,0.25);
`;

export const Drawer = styled.aside<{ open: boolean }>`
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 280px;
  max-width: 90vw;
  background: #fff;
  box-shadow: 4px 0 20px rgba(0,0,0,0.1);
  padding: 2rem 1.2rem 1rem 1.2rem;
  z-index: 1300;
  transform: translateX(${({ open }) => (open ? 0 : '-105%')});
  transition: transform 0.3s cubic-bezier(.77,0,.18,1);
  @media (min-width: 801px) {
    display: none;
  }
`;

export const Sidebar = styled.aside`
  min-width: 300px;
  padding: 1.5rem 1rem 1rem 0;
  
  @media (max-width: 800px) {
    display: none;
  }
`;

export const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.1em;
  color: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FiltersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
`;



export const CloseBtn = styled.button`
  border: none;
  background: none;
  font-size: 1.6rem;
  cursor: pointer;
  margin-left: auto;
  color: #444;
  &:hover {
    color: var(--color-primary);
  }
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1rem;
  margin-left: auto;
  cursor: pointer;
  padding:  0;
  text-decoration: underline;
  &:hover {
    color: var(--color-primary-light);
  }
`;


export const TopRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;




export const FilterRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d363a;

  @media (max-width: 700px) {
    font-size: 1.1rem;
  }
`;

export const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  width: 48px;
  height: 24px;
  appearance: none;
  background: #888;
  border-radius: 20px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background 0.25s;

  &:checked {
    background: #ff8000;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 3px;
    top: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.22s;
    transform: translateX(0);
  }

  &:checked::before {
    transform: translateX(22px);
  }
`;