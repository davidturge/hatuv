import { makeAutoObservable } from 'mobx';
import { db } from '../firebase';

export default function createAccountsStore() {
  const store = makeAutoObservable({
    accounts: new Map(),
    collectionName: 'accounts',
    state: 'pending',
    addAccount: (id, account) => {
      store.accounts.set(id, account);
    },
    getAll: async () => {
      store.setState('pending');
      try {
        const usersCollectionRef = db.collection(store.collectionName);
        const snapshot = await usersCollectionRef.get();
        snapshot.forEach((doc) => {
          store.addAccount(doc.id, doc.data());
        });
        store.setState('done');
        return store.accounts;
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    getById: async (id) => {
      store.setState('pending');
      try {
        if (!store.accounts.has(id)) {
          const usersDocRef = db.collection(store.collectionName).doc(id);
          const doc = await usersDocRef.get();
          store.addAccount(doc.id, doc.data());
        }
        store.setState('done');
        return store.accounts.get(id);
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    save: async (account) => {
      store.setState('pending');
      try {
        const doc = await db.collection(store.collectionName).add({ ...account });
        store.addAccount(doc.id, account);
        store.setState('done');
        return doc.id;
      } catch (error) {
        store.setState('error');
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