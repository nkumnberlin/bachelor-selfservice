import React from 'react';
import { CircularProgress } from '@rmwc/circular-progress';
import '@rmwc/circular-progress/circular-progress.css';
import styled from 'styled-components';

const StyledOverlaySpinner = styled(CircularProgress)`
  margin-left: 1rem;
`;
const LoadingState = props => {
  const { isFetching, size } = props;
  return isFetching && <StyledOverlaySpinner size={size} />;
};

export default LoadingState;
