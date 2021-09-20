import { makeAutoObservable } from 'mobx';
import { db } from '../firebase';

function createGroup({
  id,
  name,
  accountId,
  owners = [],
  tvs = [],
  createdOn = new Date(),
  updatedOn = new Date()
}) {
  return makeAutoObservable({
    id,
    name,
    accountId,
    owners,
    tvs,
    createdOn,
    updatedOn
  });
}

function creatGroupStore() {
  const store = makeAutoObservable({
    groups: new Map(),
    collectionName: 'groups',
    junctionCollectionName: 'junction_users_groups',
    state: 'pending',
    setGroup: (id, group) => {
      store.groups.set(id, createGroup(group));
    },
    deleteGroup: (id) => {
      store.groups.delete(id);
    },
    getAll: async (userId) => {
      store.setState('pending');
      try {
        const usersCollectionRef = db.collection(store.collectionName);
        const snapshot = await usersCollectionRef.get();
        snapshot.forEach((doc) => {
          if (doc.id !== userId) {
            store.setGroup(doc.id, doc.data());
          }
        });
        store.setState('done');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    getAllByAccountId: async (userId, accountId) => {
      store.setState('pending');
      try {
        const getGroupsByAccountQuery = db.collectionGroup(store.collectionName)
          .where('accountId', '==', accountId);
        const snapshot = await getGroupsByAccountQuery.get();
        snapshot.forEach((doc) => {
          if (doc.id !== userId) {
            store.setGroup(doc.id, doc.data());
          }
        });
        store.setState('done');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    getAllByUserId: async (userId) => {
      store.setState('pending');
      try {
        const junctions = await db
          .collection(store.junctionCollectionName)
          .where('userId', '==', userId)
          .get();
        const groupsDocs = await Promise.all(
          junctions.docs.filter((doc) => doc)
            .map((doc) => db.doc(`groups/${doc.data().groupId}`).get())
        );
        groupsDocs.filter((doc) => doc.exists)
          .forEach((doc) => {
            store.setGroup(doc.id, doc.data());
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
    save: async ({
      userId, accountId, group
    }) => {
      store.setState('pending');
      try {
        const ref = await db.collection(store.collectionName).doc();
        const newGroup = {
          ...group,
          id: ref.id,
          accountId,
          owners: [userId]
        };
        await db.collection(store.collectionName).doc(newGroup.id).set(newGroup);
        await db.collection(store.junctionCollectionName)
          .doc(`${userId}_${newGroup.id}`).set({ userId, groupId: newGroup.id });
        // store.setGroup(ref.id, newGroup);
        store.setState('done');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    update: async (group) => {
      store.setState('pending');
      try {
        await db.collection(store.collectionName).doc(group.id).set({ ...group });
        store.setGroup(group.id, { ...store.groups.get(group.id), ...group });
        store.setState('done');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    deleteByGroupAdmin: async (groupIds, userId) => {
      store.setState('pending');
      try {
        const batch = db.batch();
        groupIds.forEach((id) => {
          const docRef = db.collection(store.collectionName).doc(id);
          const junctionDocRef = db.collection(store.junctionCollectionName).doc(`${userId}_${id}`);
          batch.delete(docRef);
          batch.delete(junctionDocRef);
        });
        await batch.commit();
        groupIds.forEach((id) => store.deleteGroup(id));
        store.setState('done');
      } catch (error) {
        store.setState('error');
        throw Error(error);
      }
    },
    delete: async (groupIds, owners) => {
      store.setState('pending');
      try {
        const batch = db.batch();
        groupIds.forEach((id) => {
          const docRef = db.collection(store.collectionName).doc(id);
          owners.forEach((userId) => {
            const junctionDocRef = db.collection(store.junctionCollectionName).doc(`${userId}_${id}`);
            batch.delete(junctionDocRef);
          });
          batch.delete(docRef);
        });
        await batch.commit();
        groupIds.forEach((id) => store.deleteGroup(id));
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

export default creatGroupStore;
