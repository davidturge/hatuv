import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { observer } from 'mobx-react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { useStore } from '../../store/store-context';

const FormDialog = () => {
  const { uiStore } = useStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    uiStore.closeDialog();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={uiStore.dialog.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{uiStore.dialog.title}</DialogTitle>
        <DialogContent>
          {uiStore.dialog.body}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default observer(FormDialog);
