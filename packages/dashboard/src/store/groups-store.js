import { makeAutoObservable } from 'mobx';
import { db } from '../firebase';
import Group from '../models/group';

function creatGroupStore() {
  const store = makeAutoObservable({
    groups: new Map(),
    collectionName: 'groups',
    state: 'pending',
    addGroup: (id, props) => {
      store.groups.set(id, makeAutoObservable(new Group({ id, ...props })));
    },
    getAll: async () => {
      try {
        const usersCollectionRef = db.collection(store.collectionName);
        const snapshot = await usersCollectionRef.get();
        snapshot.forEach((doc) => {
          store.addGroup(doc.id, doc.data());
        });
        store.setState('done');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    getById: async (id) => {
      store.setState('pending');
      try {
        if (!store.groups.has(id)) {
          const usersDocRef = db.collection(store.collectionName).doc(id);
          const doc = await usersDocRef.get();
          store.addGroup(doc.id, doc.data());
        }
        store.setState('done');
        return store.groups.get(id);
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    setState: (newState) => {
      store.state = newState;
    }
  });

  return store;
}

export default creatGroupStore;
