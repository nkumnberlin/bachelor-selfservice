import { Grid, GridCell } from '@rmwc/grid';
import { DrawerHeader, DrawerTitle, DrawerContent } from '@rmwc/drawer';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import locDrawer from '../../assets/translation/en/locDrawerContent';

import React from 'react';

import styled from 'styled-components';

const StyledDrawerTextFieldWithBottom = styled(TextField)`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 4rem;
  width: 90%;
`;
const StyledDrawerTextField = styled(TextField)`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  width: 90%;
`;

const StyledDrawerHead = styled(DrawerHeader)`
  margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
`;

const ChangePasscode = () => {
  return (
    <>
      <StyledDrawerHead dir="ltr">
        <DrawerTitle>{locDrawer.drawerChangeDrawerPasscode}</DrawerTitle>
      </StyledDrawerHead>

      <DrawerContent dir="ltr">
        <StyledDrawerTextFieldWithBottom
          name="password"
          label={locDrawer.drawerChangeDrawerChangePasscode}
          placeholder={locDrawer.drawerPlaceholder}
          required
          type="password"
        />
        <StyledDrawerTextField
          name="password"
          label={locDrawer.drawerChangeDrawerNewPasscode}
          placeholder={locDrawer.drawerPlaceholder}
          required
          type="password"
        />
        <StyledDrawerTextField
          name="password"
          label={locDrawer.drawerChangeDrawerConfirmPasscode}
          placeholder={locDrawer.drawerPlaceholder}
          required
          type="password"
        />
      </DrawerContent>
      <Grid>
        <GridCell align="bottom" span={12}>
          <StyledButton unelevated>{locDrawer.drawerChangeDrawerSetNewPasscode}</StyledButton>
        </GridCell>
      </Grid>
    </>
  );
};

export default ChangePasscode;
