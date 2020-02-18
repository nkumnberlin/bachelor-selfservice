import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@rmwc/drawer';
import styled from 'styled-components';

const RightSideDrawer = React.memo(
  ({ component: Component, wide, ...rest }) => {
    const { drawer, dir } = rest;

    const StyledDrawer = styled(Drawer)`
      width: ${wide ? '70rem !important' : '20rem !important'};
    `;

    return (
      <>
        <StyledDrawer
          dir={dir}
          modal
          open={drawer.showDrawer}
          onClose={() => drawer.toggleDrawer()}
        >
          {Component}
        </StyledDrawer>
      </>
    );
  },
  (prevProps, nextProps) => prevProps.drawer.showDrawer === nextProps.drawer.showDrawer
);
export default RightSideDrawer;

RightSideDrawer.propTypes = {
  component: PropTypes.object.isRequired,
  wide: PropTypes.bool.isRequired
};
