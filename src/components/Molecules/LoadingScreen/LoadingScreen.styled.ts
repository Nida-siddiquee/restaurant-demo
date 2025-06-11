import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  min-height: 80vh;
  background: #fffaf6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px);}
  to { opacity: 1; transform: none;}
`;

export const LoaderImage = styled.img`
  width: auto;
  max-width: 80vw;
  margin-bottom: 2.2rem;
  animation: ${fadeIn} 0.9s cubic-bezier(0.4, 0.2, 0.3, 1);
`;

export const LoadingText = styled.div`
  font-size: 1.4rem;
  color: #ff8000;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.01em;
  animation: ${fadeIn} 1.2s 0.1s both;
`;
