
import styled from "styled-components";
import { Link } from "react-router-dom";


export const HeaderWrapper = styled.header`
  width: 100%;
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  min-height: 64px;
  box-shadow: 0 5px 8px rgba(0, 112, 243, 0.03);
  position: sticky;
  top: 0;
  z-index: 10;
  color: #262626;
  background: var(--color-bg);

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    min-height: 56px;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.5rem;
    min-height: 48px;
    gap: 0.5rem;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    height: 44px;
    width: auto;
    @media (max-width: 768px) {
      height: 36px;
    }
    @media (max-width: 480px) {
      height: 24px;
    }
  }
`;

export const PostcodeInfo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 30px;
  padding: 0.4rem 1.3rem;
  background-color: var(--color-tab-bg, #f5f7fa);
  color: var(--color-text, #262626);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
  transition: background-color 0.3s ease;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: var(--color-tab-bg-hover, #e2e8f0);
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.7rem;
    img {
      width: 18px;
      height: 18px;
    }
  }
  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 0.15rem 0.4rem;
    img {
      width: 15px;
      height: 15px;
    }
  }
`;
