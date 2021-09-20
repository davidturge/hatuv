import { makeAutoObservable } from 'mobx';
import { auth, db } from '../firebase';

function createUser({
  id,
  accountId,
  firstName,
  lastName,
  email,
  active = true,
  avatar = null,
  groups = [],
  permission = 2
}) {
  return makeAutoObservable({
    id,
    accountId,
    firstName,
    lastName,
    email,
    active,
    avatar,
    permission,
    groups,
    createdOn: new Date(),
    updatedOn: new Date()
  });
}

function createUserStore() {
  const store = makeAutoObservable({
    users: new Map(),
    collectionName: 'users',
    state: 'pending',
    setUser: (id, user) => {
      store.users.set(id, createUser(user));
    },
    getAll: async (currentUserId) => {
      store.setState('pending');
      try {
        const usersCollectionRef = db.collection(store.collectionName);
        const snapshot = await usersCollectionRef.get();
        snapshot.forEach((doc) => {
          if (doc.id !== currentUserId) {
            store.setUser(doc.id, doc.data());
          }
        });
        store.setState('done');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    getAllByAccountId: async (currentUserId, currentAccountId) => {
      store.setState('pending');
      try {
        const getUsersByAccountQuery = db.collectionGroup(store.collectionName).where('accountId', '==', currentAccountId);
        const snapshot = await getUsersByAccountQuery.get();
        snapshot.forEach((doc) => {
          if (doc.id !== currentUserId) {
            store.setUser(doc.id, doc.data());
          }
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
        if (!store.users.has(id)) {
          const usersDocRef = db.collection(store.collectionName).doc(id);
          const doc = await usersDocRef.get();
          store.setUser(doc.id, doc.data());
        }
        store.setState('done');
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
          return batch.set(docRef, user);
        });
        await batch.commit();
        store.setState('done');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    signup: async ({ user, accountId, permission = 2 }) => {
      try {
        const { user: { uid } } = await auth.createUserWithEmailAndPassword(user.email, user.password);
        const newUser = {
          ...user, accountId, permission, id: uid
        };
        await store.save(newUser);
      } catch (error) {
        throw Error(error);
      }
    },
    save: async (user) => {
      try {
        await db.collection(store.collectionName).doc(user.id).set({ ...user });
        store.setUser(user.id, user);
      } catch (error) {
        throw Error(error);
      }
    },
    update: async (user) => {
      store.setState('pending');
      try {
        await db.collection(store.collectionName).doc(user.id).set({ ...user });
        store.setUser(user.id, { ...store.users.get(user.id), ...user });
        store.setState('done');
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

export default createUserStore;
