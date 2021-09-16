import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
  Button, DialogActions, useMediaQuery, useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/core/Alert';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& .MuiAlert-icon': {
      margin: '0 0 0 12px'
    },
    '& .MuiAlert-action': {
      padding: '4px 16px 0 0',
      margin: '0 auto 0 -8px'
    }
  }
}));

const withDashboardActions = (WrappedComponent) => (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    title: '',
    body: null,
    confirmDialogCallback: null
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    message: '',
    duration: 2000,
    severity: 'success' /** error | warning | info */
  });

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    return () => {};
  };

  const showSnackbar = ({ message, severity = 'success', duration = 4000 }) => {
    setSnackbarProps({ message, severity, duration });
    setOpenSnackbar(true);
  };

  const showDialog = ({ title = '', body = null, confirmDialogCallback = null }) => {
    setDialogProps({ title, body, confirmDialogCallback });
    setOpenDialog(true);
  };

  return (
    <>
      <WrappedComponent
        {...props}
        showSnackbar={showSnackbar}
        showDialog={showDialog}
        closeDialog={closeDialog}
      />
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          autoHideDuration={snackbarProps.duration}
          open={openSnackbar}
          onClose={closeSnackbar}
          TransitionComponent={Slide}
        >
          <Alert variant="filled" onClose={closeSnackbar} severity={snackbarProps.severity}>
            {snackbarProps.message}
          </Alert>
        </Snackbar>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {' '}
          {dialogProps.title}
        </DialogTitle>
        <DialogContent>
          {dialogProps.body}
        </DialogContent>
        {
          dialogProps.confirmDialogCallback && (
          <DialogActionsButtons onClose={closeDialog} confirmDialogCallback={dialogProps.confirmDialogCallback} />
          )
        }
      </Dialog>
    </>
  );
};

const DialogActionsButtons = ({ onClose, confirmDialogCallback }) => {
  const handleAction = (confirmed) => {
    if (confirmed) {
      confirmDialogCallback();
    }
    onClose();
  };
  return (
    <>
      <DialogActions>
        <Button onClick={() => handleAction(false)}>ביטול</Button>
        <Button onClick={() => handleAction(true)}>אישור</Button>
      </DialogActions>
    </>
  );
};

DialogActionsButtons.propTypes = {
  onClose: PropTypes.func,
  confirmDialogCallback: PropTypes.func,
};

export default withDashboardActions;
