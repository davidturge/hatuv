import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { observer } from 'mobx-react';
import withDashboardActions from '../../hoc/withDashboardActions';
import GroupProfile from './GroupProfile';
import { ACCOUNT_ACTIONS_MESSAGES_CONSTANTS } from '../../constants/forms';
import { useStore } from '../../store/store-context';
import { PermissionEnum } from '../../models/user';
import { useAuth } from '../../store/auth-context';

const GroupListToolbar = ({
  selectedEntities,
  showSnackbar,
  showDialog,
  closeDialog,
  ...rest
}) => {
  const { groupStore, uiStore } = useStore();
  const { currentUser } = useAuth();

  const onAddAccountsClicked = () => {
    showDialog({
      title: 'הוספת קבוצה',
      body: <GroupProfile
        showSnackbar={showSnackbar}
        closeDialog={closeDialog}
      />
    });
  };
  const onUpdateGroupClicked = () => {
    const id = selectedEntities[0].id || null;
    showDialog({
      title: 'עדכון קבוצה',
      body: <GroupProfile
        id={id}
        showSnackbar={showSnackbar}
        closeDialog={closeDialog}
      />
    });
  };

  const removeGroup = async () => {
    const getAllGroupsOwners = () => selectedEntities.reduce((acc, curr) => {
      const merged = [...acc, ...curr.owners];
      const mySet = new Set(merged);
      return Array.from(mySet);
    }, []);

    try {
      if (currentUser.permission === PermissionEnum.GROUP_ADMIN) {
        await groupStore.deleteByGroupAdmin(selectedEntities.map((item) => item.id), currentUser.id);
      } else {
        await groupStore.delete(selectedEntities.map((item) => item.id), getAllGroupsOwners());
      }
      showSnackbar({
        severity: 'success',
        message: ACCOUNT_ACTIONS_MESSAGES_CONSTANTS.success.delete
      });
    } catch (error) {
      showSnackbar({
        severity: 'error',
        message: 'לא ניתן לבצע את פעולת המחיקה'
      });
    }
    uiStore.setSelectedEntities([]);
  };

  const onRemoveGroupsClicked = () => {
    const title = 'מחק קבוצה';
    let bodyMessage = 'אתה בטוח שאתה מעוניין למחוק את הקבוצה?';
    if (selectedEntities.length > 1) {
      bodyMessage = 'אתה בטוח שאתה מעוניין למחוק את הקבוצות האלו?';
    }
    showDialog({
      title,
      body: <div>{bodyMessage}</div>,
      confirmDialogCallback: removeGroup
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
            disabled={selectedEntities.length > 1 || selectedEntities.length === 0}
            onClick={onUpdateGroupClicked}
          >
            עדכן
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={selectedEntities.length === 0}
            onClick={onRemoveGroupsClicked}
          >
            הסר
          </Button>
        </Box>
      </Box>
    </div>
  );
};
GroupListToolbar.propTypes = {
  selectedEntities: PropTypes.array,
  showSnackbar: PropTypes.func,
  showDialog: PropTypes.func,
  closeDialog: PropTypes.func
};
export default observer(withDashboardActions(GroupListToolbar));
