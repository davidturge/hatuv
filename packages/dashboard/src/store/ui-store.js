import { makeAutoObservable } from 'mobx';

function creatUIStore() {
  const store = makeAutoObservable({
    modal: {
      open: false,
      body: null
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
    showDialog: (title = '', body = null) => {
      store.dialog.open = true;
      store.dialog.title = title;
      store.dialog.body = body;
    },
    closeDialog: () => {
      store.dialog.open = false;
    }
  });

  return store;
}

export default creatUIStore;
