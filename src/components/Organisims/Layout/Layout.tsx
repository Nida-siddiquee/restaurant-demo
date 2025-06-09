import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main';
  grid-template-rows: 60px 1fr;
  grid-template-columns: 240px 1fr;
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  background: var(--color-primary);
  color: #fff;
  font-size: 1.25rem;
  font-weight: var(--fw-medium);
`;

const Sidebar = styled.nav`
  grid-area: sidebar;
  background: var(--color-card-bg);
  border-right: 1px solid var(--color-border);
  padding: 1.5rem 1rem;
`;

const SidebarLink = styled(NavLink)`
  display: block;
  margin-bottom: 1rem;
  color: var(--color-text);
  font-weight: var(--fw-medium);
  text-decoration: none;

  &.active {
    color: var(--color-primary);
  }

  &:hover {
    color: var(--color-primary-light);
  }
`;

const Main = styled.main`
  grid-area: main;
  padding: 2rem;
  overflow-y: auto;
  background: var(--color-bg);
`;

 const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header>Restaurant Explorer</Header>
      <Sidebar>
        <SidebarLink to="/">Postcodes</SidebarLink>
        <SidebarLink to="/restaurants">Restaurants</SidebarLink>
      </Sidebar>
      <Main>{children}</Main>
    </Container>
  );
};
export default Layout;