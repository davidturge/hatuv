import { Helmet } from 'react-helmet';
import { Box, CircularProgress, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import AccountListResults from '../components/account/AccountListResults';
import AccountListToolbar from '../components/account/AccountListToolbar';
import { useStore } from '../store/store-context';

const AccountList = () => {
  const { accountStore } = useStore();
  const { uiStore } = useStore();

  useEffect(() => {
    const getAccounts = async () => {
      await accountStore.getAll();
    };
    getAccounts();
    return () => {
      accountStore.setState('pending');
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>חשבונות</title>
      </Helmet>
      {
          accountStore.state === 'done' ? (
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
                  <AccountListResults accounts={accountStore.accounts} />
                </Box>
              </Container>
            </Box>
          ) : (
            <Box style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            >
              <CircularProgress />
            </Box>
          )
        }
    </>
  );
};

export default observer(AccountList);
