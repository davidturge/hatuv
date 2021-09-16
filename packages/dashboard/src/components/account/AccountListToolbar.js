import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store-context';
import AccountProfile1 from './AccountProfile1';
import withDashboardActions from '../../hoc/withDashboardActions';

const AccountListToolbar = ({
  selectedEntities,
  showSnackbar,
  showDialog,
  closeDialog,
  ...rest
}) => {
  const { accountStore } = useStore();
  const { uiStore } = useStore();

  const removeAccount = async () => {
    try {
      await accountStore.delete(selectedEntities.map((item) => item.id));
      showSnackbar({
        severity: 'success',
        message: 'פעולת המחיקה בוצעה בהצלחה'
      });
    } catch (error) {
      showSnackbar({
        severity: 'success',
        message: 'לא ניתן לבצע את פעולת המחיקה'
      });
    }
    uiStore.setSelectedEntities([]);
  };
  const onRemoveAccountsClicked = () => {
    const title = 'מחק חשבון';
    let bodyMessage = 'אתה בטוח שאתה מעוניין למחוק את החשבון?';
    if (selectedEntities.length > 1) {
      bodyMessage = 'אתה בטוח שאתה מעוניין למחוק את החשבונות האלו?';
    }
    showDialog({
      title,
      body: <div>{bodyMessage}</div>,
      confirmDialogCallback: removeAccount
    });
  };

  const onAddAccountsClicked = () => {
    showDialog({
      title: 'יצירת חשבון',
      body: <AccountProfile1
        showSnackbar={showSnackbar}
        closeDialog={closeDialog}
      />
    });
  };

  const onUpdateAccountsClicked = () => {
    const id = selectedEntities[0].id || null;
    showDialog({
      title: 'עדכון חשבון',
      body: <AccountProfile1 id={id} showSnackbar={showSnackbar} closeDialog={closeDialog} />
    });
  };

  return (
    <div>
      <Box {...rest}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={selectedEntities.length > 0}
            onClick={onAddAccountsClicked}
          >
            הוסף
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={selectedEntities.length === 0}
            onClick={onRemoveAccountsClicked}
          >
            הסר
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={selectedEntities.length > 1 || selectedEntities.length === 0}
            onClick={onUpdateAccountsClicked}
          >
            עדכן
          </Button>
        </Box>
      </Box>

    </div>
  );
};

AccountListToolbar.propTypes = {
  selectedEntities: PropTypes.array,
  showSnackbar: PropTypes.func,
  showDialog: PropTypes.func,
  closeDialog: PropTypes.func
};
export default observer(withDashboardActions(AccountListToolbar));
