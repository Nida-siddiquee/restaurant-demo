import React from 'react';
import Header from '@/components/Molecules/Header';
import { Container, Main } from './Layout.styled';
import { LayoutProps } from './types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};
export default Layout;
