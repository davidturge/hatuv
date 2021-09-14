import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { useStore } from '../../store/store-context';

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

const Snackbars = () => {
  const classes = useStyles();
  const { uiStore } = useStore();

  return (
    <div className={classes.root}>
      <Snackbar
        open={uiStore.snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => uiStore.closeSnackbar()}
      >
        <MuiAlert
          onClose={() => uiStore.closeSnackbar()}
          severity={uiStore.snackbar.severity}
          elevation={6}
          variant="filled"
        >
          {uiStore.snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
export default Snackbars;
