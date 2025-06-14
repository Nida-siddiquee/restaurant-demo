
import React from 'react';
import Loading from '@/assets/Loading.gif'; 
import { Container, LoaderImage, LoadingText } from './LoadingScreen.styled';

const LoadingScreen: React.FC = () => (
  <Container data-testid="loading-container">
    <LoaderImage src={Loading} alt="Loading Just Eat" />
    <LoadingText>
      Loading <span style={{ color: '#222', fontWeight: 500 }}>your delicious options…</span>
    </LoadingText>
  </Container>
);

export default LoadingScreen;
