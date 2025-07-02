import styled from 'styled-components';

export const Hero = styled.div`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  height: 260px;

  img.hero {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  img.logo {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    width: 90px;
    height: 90px;
    object-fit: contain;
    border-radius: 12px;
    background: #fff;
    border: 2px solid #eee;
    box-shadow: 0 2px 8px rgba(25, 40, 70, 0.08);

    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
      left: 0.7rem;
      bottom: 0.7rem;
    }
  }

  @media (max-width: 600px) {
    height: 160px;
    border-radius: 12px;
  }
`;