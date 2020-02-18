import React from 'react';
import '@material/dialog/dist/mdc.dialog.css';
import '@material/button/dist/mdc.button.css';
import PropTypes from 'prop-types';
import { Grid, GridCell } from '@rmwc/grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from '@rmwc/dialog';
import locDialog from '../../assets/translation/en/locDialogContent';

const PopupDialog = React.memo(
  props => {
    const { dialog, dialogAction, modelName } = props;
    const { showDialog, dialogOption } = dialog;
    const dialogInformation = {
      lockscreen: {
        header: locDialog.actionLockscreenHeader,
        body: `${locDialog.actionLockscreenBody} ${modelName}?`,
        action: dialogAction.lockScreen
      },
      wipefull: {
        header: locDialog.actionWipefullHeader,
        body: `${locDialog.actionWipefullBody} ${modelName}?`,
        action: dialogAction.wipeDevice
      },
      enablelostmode: {
        header: locDialog.actionEnablelostmodeHeader,
        body: `${locDialog.actionEnablelostmodeBody} ${modelName}?`,
        action: dialogAction.enableLostMode
      },
      disablelostmode: {
        header: locDialog.actionDisablelostmodeHeader,
        body: `${locDialog.actionDisablelostmodeBody} ${modelName}?`,
        action: dialogAction.disableLostMode
      },
      openLocateDevice: {
        header: locDialog.actionLocatedeviceHeader,
        body: `${locDialog.actionLocatedeviceBody} ${modelName}?`,
        action: dialogAction.openLocateDevice
      }
    };

    const createDialog = () => (
      <>
        <DialogTitle>{dialogInformation[dialogOption].header}</DialogTitle>
        <DialogContent>{dialogInformation[dialogOption].body} </DialogContent>
        <DialogActions>
          <Grid>
            <GridCell desktop={6} tablet={4} phone={2}>
              <DialogButton
                action="accept"
                onClick={e => {
                  dialogInformation[dialogOption].action(e, dialogOption);
                  dialog.toggleDialog(e);
                }}
              >
                {locDialog.dialogAcceptButton}
              </DialogButton>
            </GridCell>
            <GridCell desktop={6} tablet={4} phone={2}>
              <DialogButton action="close" onClick={() => dialog.toggleDialog()}>
                {locDialog.dialogCancelButon}
              </DialogButton>
            </GridCell>
          </Grid>
        </DialogActions>
      </>
    );

    return (
      <>
        <Dialog open={showDialog}>{dialogOption !== '' ? createDialog() : ''}</Dialog>
      </>
    );
  },
  (prevProps, nextProps) => prevProps.dialog.showDialog === nextProps.dialog.showDialog
);

export default PopupDialog;

PopupDialog.propTypes = {
  dialog: PropTypes.object.isRequired,
  dialogAction: PropTypes.object.isRequired,
  modelName: PropTypes.string.isRequired
};
