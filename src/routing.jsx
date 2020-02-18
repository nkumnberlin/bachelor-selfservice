import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserLogin from './components/pages/userLogin';
import PasswordForgot from './components/pages/passwordForgot';
import PasswordReset from './components/pages/passwordReset';
import TopNavBar from './components/topNavBar';
import NavBar from './components/navBar';
import PrivateRoute from './components/privateRoute';
import DeviceService from './services/deviceService';
import Settings from './components/settings';
import Downloads from './components/pages/downloads';
import UserLogout from './components/pages/userLogout';
import NotFound from './components/pages/notFound';
import InfoSnackbar from './components/handler/snackbar';

const Container = styled.div`
  width: 100%;
  @media (min-width: 1000px) {
    position: absolute;
    top: -60px;
  }
`;

const Content = styled.div`
  display: block;
  padding: 0;
  @media (min-width: 1000px) {
    padding: 0 2rem 0 calc(256px + 32px);
  }
  padding: ${props => (props.shownavbar ? '0 2rem 0 calc(256px + 32px)' : '0')};
`;

const Routing = props => {
  const {
    mtcenabled,
    handlerEvents,
    activeMenu,
    lastActivatedMenu,
    toggleNavBar,
    showNavBar,
    authorizeUser
  } = props;

  return (
    <Switch>
      <Route
        path="/login"
        render={routingProps => (
          <UserLogin {...routingProps} authorizeUser={authorizeUser} isMTCEnabled={mtcenabled} />
        )}
      />
      {/*{mtcenabled && <RouteToRassword />}*/}
      <Route path="/forgotpassword" component={PasswordForgot} />
      <Route path="/resetPassword" component={PasswordReset} />
      <Container>
        <TopNavBar activeMenu={activeMenu} toggleNavBar={toggleNavBar} />
        <NavBar
          lastActivatedMenu={lastActivatedMenu}
          activeMenu={activeMenu}
          toggleNavBar={toggleNavBar}
          showNavBar={showNavBar}
        />
        <Content shownavbar={showNavBar}>
          <PrivateRoute
            path="/devices"
            component={DeviceService}
            handler={handlerEvents}
            showNavBar={showNavBar}
          />
          <PrivateRoute
            path="/settings"
            component={Settings}
            handler={handlerEvents}
            showNavBar={showNavBar}
          />
          <PrivateRoute
            path="/downloads"
            component={Downloads}
            handler={handlerEvents}
            showNavBar={showNavBar}
          />
          <PrivateRoute path="/logout" component={UserLogout} authorizeUser={authorizeUser} />
          <PrivateRoute path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/devices" />
          <InfoSnackbar snackbar={handlerEvents.snackbar} />
        </Content>
      </Container>
    </Switch>
  );
};

export default Routing;

Routing.propTypes = {
  mtcenabled: PropTypes.bool.isRequired,
  handlerEvents: PropTypes.object.isRequired,
  lastActivatedMenu: PropTypes.func.isRequired,
  toggleNavBar: PropTypes.func.isRequired,
  showNavBar: PropTypes.bool.isRequired,
  authorizeUser: PropTypes.func.isRequired,
  activeMenu: PropTypes.string.isRequired
};
