import React from 'react';
import { Button } from '@rmwc/button';
import SplitLayout from './GridLayout';
import TextField from './textField';
import UserServices from '../../services/userServices';
import styled from 'styled-components';
import locUser from '../../assets/translation/en/locUser';

const StyledBoldHeadline = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 2.125rem;
  line-height: 2.25rem;
`;

const StyledThinParagraph = styled.p`
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.5rem;
  color: rgba(0, 0, 0, 0.38);
`;

const StyledPasswordButton = styled(Button)`
  margin-top: 5.75rem;
`;

class PasswordForgot extends UserServices {
  state = {
    data: {
      username: '',
      password: ''
    }
  };

  ForgottenPasswordLayout = (username, handleChange, label, value) => (
    <>
      <StyledBoldHeadline>{locUser.headerForgotPassword}</StyledBoldHeadline>
      {this.RenderForgottenPasswordTextField(username, handleChange, label, value)}
      <StyledThinParagraph>{locUser.paragraphForgotInstructions}</StyledThinParagraph>
      <StyledPasswordButton label={locUser.labelResetPassword} unelevated />
    </>
  );

  RenderForgottenPasswordTextField = (username, handleChange, label, value) => (
    <>
      <TextField
        name={username}
        label={label}
        value={value}
        onChange={handleChange}
        reference={username}
        required
      />
    </>
  );

  render() {
    const { data } = this.state;
    return (
      <>
        <SplitLayout
          component={this.ForgottenPasswordLayout(
            'username',
            this.handleChange,
            locUser.labelPassword,
            data.username
          )}
        />
      </>
    );
  }
}

// TODO Button for CANCEL

export default PasswordForgot;
