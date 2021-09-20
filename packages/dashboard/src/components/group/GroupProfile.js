import { Box, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store-context';
import { GROUP_ACTIONS_MESSAGES_CONSTANTS, GROUP_FORM_CONSTANTS } from '../../constants/forms';
import { useAuth } from '../../store/auth-context';

const GroupProfile = ({ id, closeDialog, showSnackbar }) => {
  const { groupStore } = useStore();
  const { uiStore } = useStore();
  const { currentUser } = useAuth();
  const initialAccountValue = {
    name: ''
  };

  const group = id ? groupStore.groups.get(id) : initialAccountValue;

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required(GROUP_FORM_CONSTANTS.name.validation.required)
  });

  const formik = useFormik({
    initialValues: group,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.id) {
          await groupStore.update(values);
          showSnackbar({ severity: 'success', message: GROUP_ACTIONS_MESSAGES_CONSTANTS.success.update });
        } else {
          await groupStore.save(
            {
              userId: currentUser.id,
              userName: `${currentUser.firstName} ${currentUser.lastName}`,
              accountId: currentUser.accountId,
              group: values
            }
          );
          showSnackbar({ severity: 'success', message: GROUP_ACTIONS_MESSAGES_CONSTANTS.success.create });
        }
        uiStore.setSelectedEntities([]);
        closeDialog();
      } catch (error) {
        showSnackbar({ severity: 'error', message: error.message });
        throw Error(error);
      }
    }
  });

  const handleCloseDialog = () => {
    closeDialog();
  };

  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            name="name"
            value={formik.values.name}
            placeholder={GROUP_FORM_CONSTANTS.name.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Button color="primary" variant="contained" type="submit">
            שמור
          </Button>
          <Button color="primary" variant="contained" onClick={handleCloseDialog}>
            בטל
          </Button>
        </form>
      </Box>
    </>
  );
};

GroupProfile.propTypes = {
  id: PropTypes.string,
  closeDialog: PropTypes.func,
  showSnackbar: PropTypes.func
};

GroupProfile.defaultProps = {
  id: null,
  closeDialog: null,
  showSnackbar: null
};

export default observer(GroupProfile);
