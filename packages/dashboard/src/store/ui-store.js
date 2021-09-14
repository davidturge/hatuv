import { makeAutoObservable } from 'mobx';

function creatUIStore() {
  const store = makeAutoObservable({
    modal: {
      open: false,
      body: null
    },
    snackbar: {
      open: false,
      message: null,
      severity: null
    },
    dialog: {
      open: false,
      title: '',
      body: null
    },
    windowDimensions: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    showModal: (body = null) => {
      store.modal.open = true;
      store.modal.body = body;
    },
    closeModal: () => {
      store.modal.open = false;
    },
    showDialog: ({
      title = '', body = null
    }) => {
      store.dialog.open = true;
      store.dialog.title = title;
      store.dialog.body = body;
    },
    closeDialog: () => {
      store.dialog.open = false;
    },
    showSnackbar: ({ severity = null, message = null }) => {
      debugger;
      if (!severity || !message) {
        throw Error('must have severity & message initialized');
      }
      store.snackbar.open = true;
      store.snackbar.message = message;
      store.snackbar.severity = severity;
    },
    closeSnackbar: () => {
      store.snackbar.open = false;
    },
  });

  return store;
}

export default creatUIStore;
