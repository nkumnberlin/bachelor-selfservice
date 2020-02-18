import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardPrimaryAction } from '@rmwc/card';
import { List, CollapsibleList, SimpleListItem } from '@rmwc/list';
import { GridCell } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import styled from 'styled-components';
import { LostModeRuleset, RequestLocationRuleset } from '../helper/rulesets';
import {
  showAlertIfDeviceIsNotResponding,
  translationOfAction,
  iconsOfAction,
  graphics,
  showLastContactOfDevice,
  showIfDeviceIsManaged,
  preHandleAction
} from '../helper/deviceHelper';

import LoadingState from '../helper/loadingState';
import locDevice from '../assets/translation/en/locDeviceOverview';

const StyledList = styled(List)`
  display: block;
  ${props => (props.shownavbar ? '@media(max-width: 720px){display: none} ' : 'display: block')}
`;

const StyledTypography = styled(Typography)`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
`;
const StyledSimpleListItem = styled(SimpleListItem)`
  pointer-events: none;
`;

const device = props => {
  const { device, updateDialog, updateDeviceInfo, isUpdating } = props;
  const deviceInformation = {
    clientid: device.clientid,
    modelName: device.displayname,
    requestLocation: false
  };

  const eventsOfAction = {
    disablelostmode: () => updateDialog('disablelostmode'),
    enablelostmode: () => updateDialog('enablelostmode'),
    lockscreen: () => updateDialog('lockscreen'),
    wipefull: () => updateDialog('wipefull'),
    requestlocation: () => updateDialog('openLocateDevice')
  };

  const ActionOfDevice = (action, isActionPending) => {
    const isDisabled = isActionPending.visible === 'disabled';
    return (
      <SimpleListItem
        graphic={iconsOfAction[action]}
        text={translationOfAction[action]}
        disabled={isDisabled}
        {...(!isDisabled && { onClick: eventsOfAction[action] })}
      >
        <LoadingState isFetching={isActionPending.status === 1} size="medium" />
      </SimpleListItem>
    );
  };

  const actionsOfCurrentDevice = preHandleAction(device);
  const detailsOfDevice = () => (
    <>
      <StyledSimpleListItem
        graphic={isUpdating ? <LoadingState isFetching size={'small'} /> : graphics[device.type]}
        text={device.displayname}
        secondaryText={device.modelname}
        metaIcon="chevron_right"
      />
      <StyledTypography use="body2" tag="div" theme="textSecondaryOnBackground">
        {locDevice.labelSerialNumber}
        {device.serialnumber}
        <br />
        {locDevice.labelLastContact}
        {showLastContactOfDevice(device.lastcontact)}
        {showAlertIfDeviceIsNotResponding(device.lastcontact)}
        <br />
        {locDevice.labelManagementMode}
        {showIfDeviceIsManaged(device)}
      </StyledTypography>
    </>
  );

  const MapActionsOfDevice = () => {
    return Object.keys(actionsOfCurrentDevice).map((action, index) => {
      return (
        actionsOfCurrentDevice[action].visible && (
          <React.Fragment key={index}>
            {ActionOfDevice(action, actionsOfCurrentDevice[action])}
          </React.Fragment>
        )
      );
    });
  };

  return (
    <CollapsibleList
      handle={<CardPrimaryAction>{detailsOfDevice()}</CardPrimaryAction>}
      onClick={() => updateDeviceInfo(deviceInformation)}
    >
      {MapActionsOfDevice()}
    </CollapsibleList>
  );
};

const RenderDeviceCards = props => {
  const { showNavBar } = props;
  return (
    <GridCell desktop={4} tablet={4} phone={4}>
      <Card>
        <StyledList shownavbar={showNavBar ? 1 : 0} twoLine>
          {device(props)}
        </StyledList>
      </Card>
    </GridCell>
  );
};

export default RenderDeviceCards;
device.propTypes = {
  device: PropTypes.object.isRequired,
  updateDialog: PropTypes.func.isRequired,
  updateDeviceInfo: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

RenderDeviceCards.propTypes = {
  showNavBar: PropTypes.bool.isRequired
};
