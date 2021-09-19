import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store/store-context';
import UserListToolbar from '../components/user/UserListToolbar';
import UserListResults from '../components/user/UserListResults';
import { useAuth } from '../store/auth-context';
import { getInitials } from '../utils/utils';
// import { getInitials } from '../utils/utils';

const UserList = () => {
  const { userStore } = useStore();
  const { currentUser } = useAuth();
  const { uiStore } = useStore();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await userStore.getByAccountId(currentUser.id, currentUser.accountId);
      const data = Array.from(userStore.users, ([, value]) => ({
        initials: getInitials(`${value.firstName} ${value.lastName}`),
        groupsCount: value.groups.length,
        ...value
      }));
      setRowData(data);
    };
    getUsers();
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
            <UserListResults rowData={rowData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default observer(UserList);
