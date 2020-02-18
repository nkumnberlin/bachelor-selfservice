import React from 'react';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarTitle,
  TopAppBarSection,
  TopAppBarFixedAdjust,
  TopAppBarActionItem,
  TopAppBarNavigationIcon
} from '@rmwc/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import styled from 'styled-components';

const StyledTopAppBar = styled(TopAppBar)`
  display: block;
  padding-top: 0 !important;

  @media (min-width: 1000px) {
    display: none !important;
    padding-top: 0 !important;
  }
`;

const TopNavBar = props => {
  const { toggleNavBar, activeMenu } = props;
  const renderTopNavBar = (
    <>
      <StyledTopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon
              icon="menu"
              onClick={() => {
                toggleNavBar();
              }}
            />
            <TopAppBarTitle>{activeMenu}</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarActionItem icon="add_circle_outline" />
          </TopAppBarSection>
        </TopAppBarRow>
      </StyledTopAppBar>
      <TopAppBarFixedAdjust />
    </>
  );
  return <>{renderTopNavBar}</>;
};

export default TopNavBar;
