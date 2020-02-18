import React from 'react';
import PropTypes from 'prop-types';
import { DrawerContent } from '@rmwc/drawer';
import { List, ListItemText, ListItemGraphic } from '@rmwc/list';
import CortadoLogo from './pages/cortadoLogo.jsx';
import routes from '../routes';
import { Drawer, DrawerHeader, DrawerTitle } from '@rmwc/drawer';
import { handleAuth } from '../services/authService';
import { ListItem } from '@rmwc/list';
import locNavBar from '../assets/translation/en/locNavBarContent';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledDrawer = styled(Drawer)`
  background: #f9f9f9 !important;
  display: none;
  padding-top: 2rem;
  @media (min-width: 1000px) {
    display: block !important;
    padding-top: 0;
  }
  display: ${props => (props.open ? 'block' : 'none')};
`;

const StyledListItemNavbarLogout = styled(ListItem)`
  position: fixed !important;
  bottom: 0 !important;
  margin-bottom: 2rem !important;
  width: auto !important;
`;

const StyledListItemNav = styled(ListItem)`
  margin-bottom: 1rem !important;
`;

const Branding = styled.div`
  margin: 24px 0 0;
`;

const StyledBranding = styled(Branding)`
  margin-top: 3rem !important;
  margin-left: 2rem !important;
`;

const StyledDrawerNavTitle = styled(DrawerTitle)`
  margin-bottom: 1rem !important;
  text-align: center !important;
`;
const StyledDrawerNavHeader = styled(DrawerHeader)`
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const NavContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
`;

const UserInfo = () => {
  const user = handleAuth.authenticatedUser || '';
  return (
    <>
      <StyledDrawerNavHeader>
        <StyledLink to="/devices">
          <StyledBranding>
            <CortadoLogo />
          </StyledBranding>
        </StyledLink>
        <StyledDrawerNavTitle>{user.username}</StyledDrawerNavTitle>
      </StyledDrawerNavHeader>
    </>
  );
};

const LogOutButton = () => (
  <>
    <StyledLink to="/logout">
      <StyledListItemNavbarLogout>
        <ListItemGraphic icon="power_settings_new" />
        <ListItemText>{locNavBar.itemLogout}</ListItemText>
      </StyledListItemNavbarLogout>
    </StyledLink>
  </>
);

const WindowWith = () => {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

const NavBar = props => {
  const { lastActivatedMenu, activeMenu, showNavBar, toggleNavBar } = props;

  const NavBarListItems = (currentMenu = 'Devices') => (
    <>
      <List>
        {routes
          .filter(route => route.menu)
          .map((route, index) => FillNavBar(route, index, currentMenu))}
        <LogOutButton />
      </List>
    </>
  );

  const FillNavBar = (route, index, currentMenu) => (
    <React.Fragment key={index}>
      <StyledLink to={route.path}>
        <StyledListItemNav
          onClick={() => {
            lastActivatedMenu(route.display);
            if (WindowWith() < 1000) {
              toggleNavBar();
            }
          }}
          activated={route.display === currentMenu}
        >
          <ListItemGraphic icon={route.icon} />
          <ListItemText>{route.display}</ListItemText>
        </StyledListItemNav>
      </StyledLink>
    </React.Fragment>
  );

  return (
    <NavContainer>
      <StyledDrawer dismissible open={showNavBar}>
        <UserInfo />
        <DrawerContent>{NavBarListItems(activeMenu)}</DrawerContent>
      </StyledDrawer>
    </NavContainer>
  );
};

export default NavBar;
NavBar.propTypes = {
  lastActivatedMenu: PropTypes.func.isRequired,
  activeMenu: PropTypes.string.isRequired,
  showNavBar: PropTypes.bool.isRequired,
  toggleNavBar: PropTypes.func.isRequired
};
