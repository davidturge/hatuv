import { makeAutoObservable } from 'mobx';

function creatUIStore() {
  const store = makeAutoObservable({
    selectedEntities: [],
    windowDimensions: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    setSelectedEntities: (items) => {
      store.selectedEntities = [...items];
    }
  });

  return store;
}

export default creatUIStore;
