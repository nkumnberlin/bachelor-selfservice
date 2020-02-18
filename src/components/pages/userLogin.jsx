import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Joi from 'joi-browser';
import { Tooltip } from '@rmwc/tooltip';
import styled from 'styled-components';
import { Button } from '@rmwc/button';
import locUser from '../../assets/translation/en/locUser';
import locError from '../../assets/translation/en/locError';
import TextField from './textField';
import SplitLayout from './GridLayout';
import UserServices from '../../services/userServices';
import { handleAuth } from '../../services/authService';
import '@rmwc/tooltip/tooltip.css';
import { handleCookies } from '../../services/tokenService';

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const StyledBoldParagraph = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
`;

const StyledBoldHeadline = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 2.125rem;
  line-height: 2.25rem;
`;

const StyledHyperLink = styled.div`
  color: rgba(0, 0, 0, 0.38);
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

class UserLogin extends UserServices {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: ''
      },
      errors: {}
    };
    this.keyPressEvents();
    this.handleCookies = handleCookies;
  }

  schema = {
    username: Joi.string()
      .required()
      .label(locUser.labelUsername),
    password: Joi.string()
      .required()
      .label(locUser.labelPassword)
  };

  username = React.createRef();

  password = React.createRef();

  keyPressEvents = () => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        this.handleSubmit(e);
      }
    });
  };

  doSubmit = async () => {
    const { data } = this.state;
    const userData = {
      type: 'basic',
      usertype: 'user',
      // username: data.username,
      // password: data.password
      username: 'alpas02',
      password: 'user.0.vm'
    };
    const response = await this.login(userData);
    this.validateNonSuccessfulResponse(response);
  };

  login = async userData => {
    const { authorizeUser } = this.props;
    try {
      const response = await handleAuth.authenticate(userData);
      if (response.success) {
        this.handleCookies.setCCSToken(response.token);
        authorizeUser();
        this.props.history.push('/devices');
      }
      return response;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.warn(locError['400']);
      }
    }
  };

  validateNonSuccessfulResponse = response => {
    if (!response.success) {
      if (response.errormessage.includes('Credentials')) {
        this.setState({ errors: { credentials: locError.credentialsInvalid } });
      }
    }
  };

  renderLoginInputs(name, label, autoFocus, type = 'text') {
    const { data, errors } = this.state;
    return (
      <>
        <Tooltip
          content={errors[name] ? errors[name] : errors.credentials ? errors.credentials : ''}
          align="right"
          open={!!errors[name] || !!errors.credentials}
        >
          <TextField
            name={name}
            label={label}
            type={type}
            autoFocus={autoFocus}
            value={data[name]}
            onChange={this.handleChange}
            required
            invalid={!!errors.credentials || (name && errors[name])}
          />
        </Tooltip>
      </>
    );
  }

  renderButton = () => (
    <>
      <StyledButton
        label={locUser.labelLoginButton}
        unelevated
        // disabled={this.validate()}
        outlined={false}
        onClick={e => this.handleSubmit(e)}
      />
      <StyledButton label={locUser.labelEnrollNewDeviceButton} unelevated={false} outlined />
      <StyledButton label={'Install the app on your Device'} id="installApp" unelevated={false} />
    </>
  );

  renderLoginScreen = isMTCEnabled => {
    return (
      <>
        <StyledBoldHeadline>{locUser.labelLWelcomeLogin}</StyledBoldHeadline>
        <StyledBoldParagraph>{locUser.labelWelcome}</StyledBoldParagraph>
        {this.renderLoginInputs('username', locUser.labelUsername, true)}
        {this.renderLoginInputs('password', locUser.labelPassword, false, 'password')}
        {isMTCEnabled && (
          <LinkToForgottenPassword
            to="/forgotpassword"
            label={locUser.labelForgotPassword}
            activeOnlyWhenExact
          />
        )}
        {this.renderButton()}
      </>
    );
  };

  render() {
    const { isMTCEnabled } = this.props;
    return (
      <>
        <SplitLayout component={this.renderLoginScreen(isMTCEnabled)} />
      </>
    );
  }
}

const LinkToForgottenPassword = ({ label, to, activeOnlyWhenExact }) => {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <StyledHyperLink className={match ? 'active' : ''}>
      {match && '> '}
      <Link style={{ color: 'inherit' }} to={to}>
        {label}
      </Link>
    </StyledHyperLink>
  );
};

export default UserLogin;
