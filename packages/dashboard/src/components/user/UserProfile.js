import { Box, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store-context';
import { USER_ACTIONS_MESSAGES_CONSTANTS, USER_FORM_CONSTANTS } from '../../constants/forms';

const UserProfile = ({ id, closeDialog, showSnackbar }) => {
  const { userStore } = useStore();
  const { uiStore } = useStore();
  const user = userStore.users.get(id);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required(USER_FORM_CONSTANTS.firstName.validation.required),
    lastName: Yup.string().max(255).required(USER_FORM_CONSTANTS.lastName.validation.required),
  });

  const formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: async (userData) => {
      try {
        await userStore.update(userData);
        showSnackbar({ severity: 'success', message: USER_ACTIONS_MESSAGES_CONSTANTS.success.update });
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
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            placeholder={USER_FORM_CONSTANTS.firstName.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            placeholder={USER_FORM_CONSTANTS.lastName.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
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

UserProfile.propTypes = {
  id: PropTypes.string,
  closeDialog: PropTypes.func,
  showSnackbar: PropTypes.func
};

UserProfile.defaultProps = {
  id: null,
  closeDialog: null,
  showSnackbar: null
};

export default observer(UserProfile);
