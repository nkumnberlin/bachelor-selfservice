import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextField as Field } from '@rmwc/textfield';

const StyledTextField = styled(Field)`
  margin-top: 1rem;
  width: 100%;
`;

const TextField = ({ name, label, ...rest }) => (
  <StyledTextField label={label} name={name} outlined {...rest} />
);

export default TextField;

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
