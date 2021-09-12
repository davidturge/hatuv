import { makeAutoObservable } from 'mobx';
import { db } from '../firebase';
import User from '../models/user';

function createUsersStore() {
  const store = makeAutoObservable({
    users: new Map(),
    collectionName: 'users',
    state: 'pending',
    addUser: (id, user) => {
      store.users.set(id, makeAutoObservable(new User(user)));
    },
    getAll: async () => {
      store.setState('pending');
      try {
        const usersCollectionRef = db.collection(store.collectionName);
        const snapshot = await usersCollectionRef.get();
        snapshot.forEach((doc) => {
          console.log(doc.data());
          store.addUser(doc.id, doc.data());
        });
        store.setState('success');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    getById: async (id) => {
      store.setState('pending');
      try {
        if (!store.users.has(id)) {
          const usersDocRef = db.collection(store.collectionName).doc(id);
          const doc = await usersDocRef.get();
          store.addUser(doc.id, doc.data());
        }
        store.setState('success');
        return store.users.get(id);
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    saveUsers: async (users) => {
      store.setState('pending');
      try {
        const batch = db.batch();
        users.forEach((user) => {
          const docRef = db.collection(store.collectionName).doc();
          return batch.set(docRef, { ...user });
        });
        await batch.commit();
        store.setState('success');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    save: async (id, newUser) => {
      try {
        await db.collection(store.collectionName).doc(id).set({ ...newUser });
      } catch (error) {
        throw Error(error);
      }
    },
    update: async () => {},
    delete: async () => {},
    setState: (newState) => {
      store.state = newState;
    }
  });
  return store;
}

export default createUsersStore;
