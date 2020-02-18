import React from 'react';
import styled from 'styled-components';
import { Button } from '@rmwc/button';
import { handleAuth } from '../../services/authService';
import locUser from '../../assets/translation/en/locUser';

const Container = styled.main``;

const UserLogout = () => {
  function signOut() {
    handleAuth.signout();
  }

  return (
    <Container>
      <h1>{locUser.headerLogout}</h1>
      <Button unelevated onClick={() => signOut()}>
        {locUser.labelLogoutButton}
      </Button>
    </Container>
  );
};
export default UserLogout;
