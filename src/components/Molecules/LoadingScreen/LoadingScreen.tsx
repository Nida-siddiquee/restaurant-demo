// src/components/Atoms/LoadingScreen.tsx

import React from 'react';
import Loading from '@/assets/Loading.gif'; // Ensure you have a loading image in this path
import { Container, LoaderImage, LoadingText } from './LoadingScreen.styled';


const LoadingScreen: React.FC = () => (
  <Container>
    <LoaderImage src={Loading} alt="Loading Just Eat" />
    <LoadingText>
      Loading <span style={{ color: '#222', fontWeight: 500 }}>your delicious options…</span>
    </LoadingText>
  </Container>
);

export default LoadingScreen;