import React from 'react';
import Loading from '@/assets/Loading.gif';
import { Container, LoaderImage, LoadingText } from './LoadingScreen.styled';

const LoadingScreen: React.FC = () => (
  <Container 
    data-testid="loading-container" 
    role="status" 
    aria-live="polite"
    aria-label="Loading restaurants"
  >
    <LoaderImage src={Loading} alt="Loading Just Eat" role="presentation" />
    <LoadingText>
      Loading <span style={{ color: '#222', fontWeight: 500 }}>your delicious options…</span>
    </LoadingText>
  </Container>
);

export default LoadingScreen;
