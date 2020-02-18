import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, SnackbarAction } from '@rmwc/snackbar';
import locDialog from '../../assets/translation/en/locSnackbarContent';

const InfoSnackbar = React.memo(
  props => {
    const { snackbar } = props;
    const dialogInformation = {
      lockscreen: {
        success: `${locDialog.snackbarLockscreenSuccess}`,
        failed: `${locDialog.snackbarLockscreenFailed}`
      },
      wipefull: {
        success: `${locDialog.snackbarLockscreenSuccess}`,
        failed: `${locDialog.snackbarLockscreenFailed}`
      },
      enablelostmode: {
        success: `${locDialog.snackbarEnablelostmodeSuccess}`,
        failed: `${locDialog.snackbarEnablelostmodeFailed}`
      },
      disablelostmode: {
        success: `${locDialog.snackbarDisablelostmodeSuccess}`,
        failed: `${locDialog.snackbarDisablelostmodeFailed}`
      },
      passcode: {
        success: `${locDialog.snackbarPasscodeSuccess}`,
        failed: `${locDialog.snackbarPasscodeFailed}`
      },
      openLocateDevice: {
        success: `${locDialog.snackbarOpenLocateDeviceSuccess}`,
        failed: `${locDialog.snackbarOpenLocateDeviceFailed}`
      },
      update: {
        success: `${locDialog.snackbarUpdateSuccess}`,
        failed: `${locDialog.snackbarUpdateFailed}`
      }
    };
    const createSnackbar = () => (
      <div>
        <Snackbar
          open={snackbar.showSnackbar}
          onClose={() => snackbar.toggleSnackbar()}
          message={
            snackbar.apiCallStatus
              ? dialogInformation[snackbar.message].success
              : dialogInformation[snackbar.message].failed
          }
          action={<SnackbarAction label="OK" onClick={() => snackbar.toggleSnackbar} />}
        />
      </div>
    );
    return <>{snackbar.apiCallStatus !== '' && createSnackbar()}</>;
  },
  (prevProps, nextProps) => prevProps.snackbar.showSnackbar === nextProps.snackbar.showSnackbar
);

export default InfoSnackbar;

InfoSnackbar.propTypes = {
  snackbar: PropTypes.object.isRequired
};
