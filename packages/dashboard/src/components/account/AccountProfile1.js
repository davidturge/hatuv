import { Box, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store-context';
import { ACCOUNT_REGISTRATION_FORM_CONSTANTS, ACCOUNT_ACTIONS_MESSAGES_CONSTANTS } from '../../constants/forms';
import { phone } from '../../utils/formValidations';

const AccountProfile1 = ({ id, closeDialog, showSnackbar }) => {
  const { accountStore } = useStore();
  const { uiStore } = useStore();
  const initialAccountValue = {
    name: '',
    email: '',
    phone: ''
  };
  const account = id ? {
    ...accountStore.accounts.get(id),
    city: accountStore.accounts.get(id).address.city,
    houseNumber: accountStore.accounts.get(id).address.houseNumber,
    street: accountStore.accounts.get(id).address.street
  } : initialAccountValue;

  // const setAddressOnSave = (data) => {
  //   const newAccount = Object.entries(data).reduce((res, [key, value]) => {
  //     if (key === 'city' || key === 'street' || key === 'houseNumber') {
  //       res.address[key] = value;
  //     } else {
  //       res[key] = value;
  //     }
  //     return res;
  //   }, { address: {} });
  //   return newAccount;
  // };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(ACCOUNT_REGISTRATION_FORM_CONSTANTS.companyEmail.validation.error).max(255)
      .required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.companyEmail.validation.required),
    name: Yup.string().max(255).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.companyName.validation.required),
    phone: Yup.string().matches(phone, ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.validation.error)
      .required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.validation.required)
  });

  const formik = useFormik({
    initialValues: account,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.id) {
          await accountStore.update(values);
          showSnackbar({ severity: 'success', message: ACCOUNT_ACTIONS_MESSAGES_CONSTANTS.success.update });
        } else {
          accountStore.save(values);
          showSnackbar({ severity: 'success', message: ACCOUNT_ACTIONS_MESSAGES_CONSTANTS.success.create });
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
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.companyName.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.companyEmail.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            name="phone"
            value={formik.values.phone}
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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

AccountProfile1.propTypes = {
  id: PropTypes.string,
  closeDialog: PropTypes.func,
  showSnackbar: PropTypes.func
};

AccountProfile1.defaultProps = {
  id: null,
  closeDialog: null,
  showSnackbar: null
};

export default observer(AccountProfile1);
