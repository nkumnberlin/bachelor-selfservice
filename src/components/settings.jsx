import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from '@rmwc/list';
import { Grid, GridCell } from '@rmwc/grid';
import ListComponent from './pages/listComponent';
import Drawer from './handler/drawer';
import ChangePasscode from './pages/changePasscode';
import locDrawer from '../assets/translation/en/locDrawerContent';

const StyledDeviceHeader = styled.h1`
  margin-top: 2.4375rem;
  height: 24px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  display: block;
  ${props => (props.shownavbar ? '@media(max-width: 720px){display: none} ' : 'display: block')}
`;

const Settings = props => {
  const { drawer } = props.handler;
  const { showNavBar } = props;

  const createListComponent = (icon, primaryLabel, secondardLabel, metaIcon) => (
    <ListComponent
      icon={icon}
      primaryLabel={primaryLabel}
      secondaryLabel={secondardLabel}
      metaIcon={metaIcon}
      toggleDrawer={drawer.toggleDrawer}
    />
  );

  const createSettings = () => (
    <>
      <Drawer dir={'rtl'} drawer={drawer} component={<ChangePasscode />} wide={false} />
      <Grid>
        <GridCell span={12}>
          <StyledDeviceHeader>{locDrawer.drawerHeaderSettings}</StyledDeviceHeader>
          <List twoLine>
            {createListComponent(
              'lock',
              locDrawer.drawerPassword,
              locDrawer.drawerChangePassword,
              'edit'
            )}
            {createListComponent(
              'phonelink_lock',
              locDrawer.drawerSharepointPassword,
              locDrawer.drawerChangeSharepointPassword,
              'edit'
            )}
          </List>
        </GridCell>
      </Grid>
    </>
  );

  return <StyledDiv shownavbar={showNavBar ? 1 : 0}>{createSettings()}</StyledDiv>;
};

export default Settings;
