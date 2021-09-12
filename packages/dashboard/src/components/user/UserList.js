import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store-context';

const UserList = () => {
  const { userStore } = useStore();
  useEffect(() => {
    const getUsers = async () => {
      await userStore.getAll();
      console.log(userStore.users);
    };
    getUsers();
    return () => {
      userStore.setState('pending');
    };
  }, []);

  const UserItem = observer(({ user }) => (
    <div>
      {user.firstName}
      {' '}
      -
      {' '}
      {user.lastName}
    </div>
  ));
  return (
    <div>
      {
        userStore.state === 'done'
        && Array.from(userStore.users).map(([, value]) => <UserItem key={Math.random()} user={value} />)
      }
    </div>
  );
};

export default observer(UserList);
