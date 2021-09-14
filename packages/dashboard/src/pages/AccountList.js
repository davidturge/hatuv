import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useStore } from '../store/store-context';
import AccountListResults from '../components/account/AccountListResults';
import AccountListToolbar from '../components/account/AccountListToolbar';
import EntityDialog from '../components/dialog/FormDialog';

const AccountList = () => {
  const [selectedEntitiesIds, setSelectedEntitiesIds] = useState([]);
  const { accountStore } = useStore();

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
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <AccountListToolbar selectedAccountIds={selectedEntitiesIds} />
          <Box sx={{ pt: 3 }}>
            <AccountListResults
              accounts={accountStore.accounts}
              entitiesState={{ selectedEntitiesIds, setSelectedEntitiesIds }}
            />
          </Box>
        </Container>
        <EntityDialog />
      </Box>
    </>
  );
};

export default AccountList;
