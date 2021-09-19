import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store-context';
import withDashboardActions from '../../hoc/withDashboardActions';
import UserProfile from './UserProfile';
import { encrypt } from '../../utils/utils';
import { useAuth } from '../../store/auth-context';
import { USER_ACTIONS_MESSAGES_CONSTANTS } from '../../constants/forms';

const UserListToolbar = ({
  selectedEntities,
  showSnackbar,
  showDialog,
  closeDialog,
  ...rest
}) => {
  const { userStore } = useStore();
  const { uiStore } = useStore();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const removeAccount = async () => {
    try {
      await userStore.delete(selectedEntities.map((item) => item.id));
      showSnackbar({
        severity: 'success',
        message: USER_ACTIONS_MESSAGES_CONSTANTS.success.delete
      });
    } catch (error) {
      showSnackbar({
        severity: 'success',
        message: 'לא ניתן לבצע את פעולת המחיקה'
      });
    }
    uiStore.setSelectedEntities([]);
  };

  const onRemoveUsersClicked = () => {
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

  // const onAddUsersClicked = () => {
  //   showDialog({
  //     title: 'יצירת חשבון',
  //     body: <UserProfile
  //       showSnackbar={showSnackbar}
  //       closeDialog={closeDialog}
  //     />
  //   });
  // };

  const onUpdateUsersClicked = () => {
    const id = selectedEntities[0].id || null;
    showDialog({
      title: 'עדכון חשבון',
      body: <UserProfile
        id={id}
        showSnackbar={showSnackbar}
        closeDialog={closeDialog}
      />
    });
  };

  const onGenerateUserRegisterLink = () => {
    navigate(`/register/${encrypt(/**/{ accountId: currentUser.accountId, permission: 2 })}`);
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
            disabled={selectedEntities.length === 0}
            onClick={onRemoveUsersClicked}
          >
            הסר
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={selectedEntities.length > 1 || selectedEntities.length === 0}
            onClick={onUpdateUsersClicked}
          >
            עדכן
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={onGenerateUserRegisterLink}
          >
            שלח בקשה ליצירת משתמש
          </Button>
        </Box>
      </Box>

    </div>
  );
};

UserListToolbar.propTypes = {
  selectedEntities: PropTypes.array,
  showSnackbar: PropTypes.func,
  showDialog: PropTypes.func,
  closeDialog: PropTypes.func
};
export default observer(withDashboardActions(UserListToolbar));
