import React from 'react';
import PropTypes from 'prop-types';
import ListComponent from './listComponent';
import { List } from '@rmwc/list';
import { Grid, GridCell } from '@rmwc/grid';
import styled from 'styled-components';
import locDrawer from '../../assets/translation/en/locDrawerContent';

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

const Downloads = props => {
  const { showNavBar } = props;

  const createListComponent = (icon, primaryLabel, secondardLabel, metaIcon) => (
    <ListComponent
      icon={icon}
      primaryLabel={primaryLabel}
      secondaryLabel={secondardLabel}
      metaIcon={metaIcon}
      toggleDrawer={''}
    />
  );
  const createDownloads = () => (
    <>
      <Grid>
        <GridCell span={12}>
          <StyledDeviceHeader>{locDrawer.drawerHeaderDownload}</StyledDeviceHeader>
          <List
            twoLine
            onClick={() => {
              console.warn('Download started');
            }}
          >
            {createListComponent(
              'verified_user',
              locDrawer.drawerDownloadRoot,
              locDrawer.drawerDownloadRootSecondary,
              'cloud_download'
            )}
            {createListComponent(
              'desktop_windows',
              locDrawer.drawerDownloadWorkplace,
              locDrawer.drawerDownloadeWorkplaceSecondary,
              'cloud_download'
            )}
          </List>
        </GridCell>
      </Grid>
    </>
  );
  return <StyledDiv shownavbar={showNavBar ? 1 : 0}>{createDownloads()}</StyledDiv>;
};
export default Downloads;
Downloads.propTypes = {
  showNavBar: PropTypes.bool.isRequired
};
