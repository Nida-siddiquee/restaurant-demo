import React, { ReactNode } from 'react';
import Header from '@/components/Molecules/Header';
import { Container, Main } from './Layout.styled';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};
export default Layout;
