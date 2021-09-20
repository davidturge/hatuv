import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store/store-context';
import UserListToolbar from '../components/user/UserListToolbar';
import UserListResults from '../components/user/UserListResults';
import { useAuth } from '../store/auth-context';
import { PermissionEnum } from '../models/user';

const UserList = () => {
  const { userStore } = useStore();
  const { currentUser } = useAuth();
  const { uiStore } = useStore();

  useEffect(() => {
    const getUsers = async (permission) => {
      if (permission === PermissionEnum.SUPER_USER) {
        await userStore.getAll(currentUser.id);
      } else {
        await userStore.getAllByAccountId(currentUser.id, currentUser.accountId);
      }
    };
    getUsers(currentUser.permission);
    return () => {
      uiStore.setSelectedEntities([]);
      userStore.setState('pending');
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>משתמשים</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar selectedEntities={uiStore.selectedEntities} />
          <Box sx={{ pt: 3 }}>
            <UserListResults users={userStore.users} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default observer(UserList);
