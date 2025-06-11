import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@/components/Molecules/Header';

interface LayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header '
    ' main';
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr; 
  height: 100vh;
`;



const Main = styled.main`
  grid-area: main;
  padding: 2rem;
  overflow-y: auto;
  background: var(--color-bg);
  @media (max-width: 768px) {
    padding: 1rem;
  }
  @media (max-width: 480px) {
    padding: 0rem;
  }
`;

 const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
        <Header />  
      <Main>{children}</Main>
    </Container>
  );
};
export default Layout;