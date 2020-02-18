import React from 'react';
import SplitLayout from './GridLayout';
import TextField from './textField';
import UserServices from '../../services/userServices';
import { Button } from '@rmwc/button';
import styled from 'styled-components';
import locUser from '../../assets/translation/en/locUser';

const StyledBoldHeadline = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 2.125rem;
  line-height: 2.25rem;
`;

const StyledPasswordButton = styled(Button)`
  margin-top: 5.75rem;
`;

class PasswordReset extends UserServices {
  state = {
    data: {
      username: '',
      password: '',
      newPassword: '',
      newPasswordConfirmation: ''
    }
  };

  RenderResetPasswordLayout = () => {
    const { data } = this.state;
    return (
      <>
        <StyledBoldHeadline>{locUser.labelResetPassword} </StyledBoldHeadline>
        {this.RenderResetPasswordTextField(
          'newPassword',
          this.handleChange,
          locUser.labelNewPassword,
          data.newPassword
        )}
        {this.RenderResetPasswordTextField(
          'newPasswordConfirmation',
          this.handleChange,
          locUser.labelConfirmNewPassword,
          data.newPasswordConfirmation
        )}
        <StyledPasswordButton label={locUser.labelResetPassword} unelevated />
      </>
    );
  };

  RenderResetPasswordTextField = (password, handleChange, label, value) => (
    <>
      <TextField
        name={password}
        label={label}
        value={value}
        onChange={handleChange}
        reference={password}
        required
      />
    </>
  );

  render() {
    return (
      <>
        <SplitLayout component={this.RenderResetPasswordLayout()} />
      </>
    );
  }
}

export default PasswordReset;
