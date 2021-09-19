import { makeAutoObservable } from 'mobx';
import { db } from '../firebase';

// const imageMetadata = {
//   contentType: 'image/jpeg',
//   cacheControl: 'public,max-age=2592000'
// };

function createAccount({
  id = null,
  name,
  email,
  logo = null,
  groups = [],
  type = 0,
  phone,
  createdOn = new Date(),
  updatedOn = new Date()
}) {
  return makeAutoObservable({
    id,
    name,
    email,
    logo,
    groups,
    phone,
    type,
    createdOn,
    updatedOn
  });
}

export default function createAccountStore(userStore) {
  const store = makeAutoObservable({
    accounts: new Map(),
    collectionName: 'accounts',
    state: 'pending',
    setAccount: (id, account) => {
      store.accounts.set(id, createAccount(account));
    },
    deleteAccount: (id) => {
      store.accounts.delete(id);
    },
    getAll: async () => {
      store.setState('pending');
      try {
        const usersCollectionRef = db.collection(store.collectionName);
        const snapshot = await usersCollectionRef.get();
        snapshot.forEach((doc) => {
          // if (doc.id !== currUser.accountId) {
          store.setAccount(doc.id, doc.data());
          // }
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
          store.setAccount(doc.id, doc.data());
        }
        store.setState('done');
        return store.accounts.get(id);
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    save: async (account, user = null) => {
      try {
        const ref = await db.collection(store.collectionName).doc();
        const newAccount = { ...account, id: ref.id };
        await db.collection(store.collectionName).doc(newAccount.id).set(newAccount);
        // storage.child().put((account.file, { customMetadata: imageMetadata })).then((snapshot) => {
        //   console.log('Uploaded a blob or file!');
        // });
        if (user) {
          await userStore.signup({ user, accountId: newAccount.id, permission: 0 });
        }
        store.setAccount(ref.id, newAccount);
      } catch (error) {
        throw Error(error);
      }
    },
    update: async (account) => {
      try {
        await db.collection(store.collectionName).doc(account.id).set({ ...account });
        store.setAccount(account.id, { ...store.accounts.get(account.id), ...account });
      } catch (error) {
        throw Error(error);
      }
    },
    delete: async (accountsIds) => {
      try {
        const batch = db.batch();
        accountsIds.forEach((id) => {
          const docRef = db.collection(store.collectionName).doc(id);
          return batch.delete(docRef);
        });
        await batch.commit();
        accountsIds.forEach((id) => store.deleteAccount(id));
      } catch (error) {
        throw Error(error);
      }
    },
    setState: (newState) => {
      store.state = newState;
    }
  });

  return store;
}
