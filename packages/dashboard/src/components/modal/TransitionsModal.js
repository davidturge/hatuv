import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react';
import theme from '../../theme';
import { useStore } from '../../store/store-context';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function TransitionsModal() {
  const classes = useStyles();
  const { uiStore } = useStore();

  const handleClose = () => {
    uiStore.closeModal();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={uiStore.modal.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={uiStore.modal.open}>
        <div className={classes.paper}>
          {uiStore.modal.body}
        </div>
      </Fade>
    </Modal>
  );
}

export default observer(TransitionsModal);
