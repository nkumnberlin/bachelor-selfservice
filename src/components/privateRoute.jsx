import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { handleAuth } from '../services/authService';

export default function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = handleAuth.isAuthenticated;
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
};
