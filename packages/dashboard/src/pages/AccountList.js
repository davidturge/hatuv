import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import AccountListResults from '../components/account/AccountListResults';
import AccountListToolbar from '../components/account/AccountListToolbar';
import { useStore } from '../store/store-context';
import { useAuth } from '../store/auth-context';

const AccountList = () => {
  const { accountStore } = useStore();
  const { uiStore } = useStore();
  const { currentUser } = useAuth();
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    const getAccounts = async () => {
      await accountStore.getAll(currentUser.id);
      const data = Array.from(accountStore.accounts, ([, value]) => ({
        groupsCount: value.groups.length,
        ...value
      }));
      setRowData(data);
    };
    getAccounts();
    return () => {
      uiStore.setSelectedEntities([]);
      accountStore.setState('pending');
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>חשבונות</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <AccountListToolbar selectedEntities={uiStore.selectedEntities} />
          <Box sx={{ pt: 3 }}>
            <AccountListResults rowData={rowData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default observer(AccountList);
