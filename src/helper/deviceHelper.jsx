import React from 'react';
import { format, differenceInHours } from 'date-fns';
import { Icon } from '@rmwc/icon';
import '@rmwc/icon/icon.css';
import locDevices from '../assets/translation/en/locDeviceOverview';
import { LostModeRuleset, RequestLocationRuleset } from './rulesets';

const showLastContactOfDevice = lastContact => {
  // 04.09.2019 - 09:41AM GMT
  const dateTime = parseInt(lastContact.replace(/\D/g, ''), 10);
  return `${format(new Date(dateTime), 'dd.MM.yyyy - hh:mm a')} GMT `;
};

const showAlertIfDeviceIsNotResponding = lastContact => {
  const today = new Date();
  const dateTime = parseInt(lastContact.replace(/\D/g, ''), 10);
  const result = differenceInHours(today, dateTime);

  return (
    result > 25 && <Icon style={{ color: 'red' }} icon={{ icon: 'warning', size: 'xsmall' }} />
  );
};

const showIfDeviceIsManaged = device => {
  let managedString = '';
  const androidProfiles = ['', 'Via App', 'Work Profile', 'Fully Managed Device'];
  const enrollmentTypes = ['Zero Touch', 'DEP', 'User Enrollment'];
  const { type, enrollmenttype, supervised, androidforworktype } = device;

  // checkApple
  if (type === 2) {
    if (supervised) managedString = 'Supervised ';
    if (supervised && enrollmenttype === 1) managedString += ' ';
    if (enrollmenttype === 1) managedString += enrollmentTypes[enrollmenttype];
  } else {
    managedString += androidProfiles[androidforworktype];
    if (androidforworktype !== 0 && enrollmenttype !== null) managedString += ' ';
    if (enrollmenttype !== null) managedString += enrollmentTypes[enrollmenttype];
  }

  return managedString !== '' ? managedString : 'not supervised';
};

const graphics = {
  0: 'device_unknown',
  1: 'phone_android',
  2: 'phone_iphone',
  3: 'devie_unknown',
  4: 'phone_android',
  5: 'laptop_windows',
  6: 'phone_android'
};

const translationOfAction = {
  disablelostmode: locDevices.labelActionDisablelostmode,
  enablelostmode: locDevices.labelActionEnablelostmode,
  lockscreen: locDevices.labelActionLockscreen,
  wipefull: locDevices.labelActionWipefull,
  requestlocation: locDevices.labelActionRequestLocation
};

const iconsOfAction = {
  disablelostmode: 'toggle_off',
  enablelostmode: 'toggle_on',
  lockscreen: 'screen_lock_portrait',
  wipefull: 'delete_forever',
  requestlocation: 'location_searching'
};

const handleLostMode = device => {
  return LostModeRuleset(device.actions, device);
};

const handleShowLocation = device => {
  const { location } = device;
  return RequestLocationRuleset(device.actions, location);
};

const preHandleAction = device => {
  device.actions = handleLostMode(device);
  device.actions = handleShowLocation(device);
  return device.actions;
};

export {
  showLastContactOfDevice,
  showAlertIfDeviceIsNotResponding,
  showIfDeviceIsManaged,
  graphics,
  translationOfAction,
  iconsOfAction,
  preHandleAction,
};
