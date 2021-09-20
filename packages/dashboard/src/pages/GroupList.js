import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store/store-context';
import GroupListToolbar from '../components/group/GroupListToolbar';
import GroupListResults from '../components/group/GroupListResults';
import { PermissionEnum } from '../models/user';
import { useAuth } from '../store/auth-context';

const GroupList = () => {
  const { groupStore } = useStore();
  const { currentUser } = useAuth();
  const { uiStore } = useStore();

  useEffect(() => {
    const getGroups = async (permission) => {
      if (permission === PermissionEnum.SUPER_USER) {
        await groupStore.getAll(currentUser.id);
      } else if (permission === PermissionEnum.ACCOUNT_ADMIN) {
        await groupStore.getAllByAccountId(currentUser.id, currentUser.accountId);
      } else {
        await groupStore.getAllByUserId(currentUser.id);
      }
    };
    getGroups(currentUser.permission);
    return () => {
      uiStore.setSelectedEntities([]);
      groupStore.setState('pending');
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
          <GroupListToolbar selectedEntities={uiStore.selectedEntities} />
          <Box sx={{ pt: 3 }}>
            <GroupListResults groups={groupStore.groups} state={groupStore.state} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default observer(GroupList);
