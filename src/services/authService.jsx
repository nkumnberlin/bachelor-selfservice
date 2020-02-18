import { Auth } from './cortadoEndpoint';
import { endpoint } from '../apiRoutes';
import { handleCookies } from './tokenService';

export const handleAuth = {
  isAuthenticated: undefined,
  authenticatedUser: {},

  async authenticate(userData) {
    const { data } = await Auth(endpoint.login, userData);
    if (data.success || !handleCookies.checkIfTokenISInvalid()) {
      handleAuth.isAuthenticated = true;
      handleAuth.setAuthenticatedUser(userData);
    } else handleAuth.isAuthenticated = false;
    return data;
  },

  setAuthenticatedUser(userData) {
    handleAuth.authenticatedUser = userData;
  },

  signout() {
    handleAuth.isAuthenticated = false;
    handleAuth.setAuthenticatedUser(null);
    handleCookies.removeCCSToken();
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    window.location.href = `${publicUrl.origin}/up/`;
  }
};
