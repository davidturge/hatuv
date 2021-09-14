import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../../store/store-context';
import { ACCOUNT_REGISTRATION_FORM_CONSTANTS, USER_REGISTRATION_FORM_CONSTANTS } from '../../constants/forms';
import { phone } from '../../utils/formValidations';
import Snackbars from '../snackbar/Snackbars';

const AccountProfile1 = ({ id }) => {
  const { accountStore } = useStore();
  const { uiStore } = useStore();
  const initialAccountValue = {
    name: '',
    email: '',
    phone: '',
    mobile: '',
    city: '',
    houseNumber: '',
    street: ''
  };
  const account = id ? accountStore.accounts.get(id) : initialAccountValue;
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(ACCOUNT_REGISTRATION_FORM_CONSTANTS.email.validation.error).max(255).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.email.validation.required),
    name: Yup.string().max(255).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.name.validation.required),
    phone: Yup.string().matches(phone, ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.validation.error).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.validation.required),
    mobile: Yup.string().matches(phone, ACCOUNT_REGISTRATION_FORM_CONSTANTS.mobile.validation.error).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.mobile.validation.required),
    city: Yup.string().required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.city.validation.required),
    houseNumber: Yup.number().required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.houseNumber.validation.required),
    street: Yup.string().required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.street.validation.required)
  });

  const formik = useFormik({
    initialValues: {
      ...account,
      city: account.address.city,
      houseNumber: account.address.houseNumber,
      street: account.address.street
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.id) {
          await accountStore.update(values);
          uiStore.showSnackbar({ severity: 'success', message: 'חשבון עודכן בהצלחה' });
        } else {
          accountStore.save(values);
          uiStore.showSnackbar({ severity: 'success', message: 'חשבון נוסף בהצלחה' });
        }
      } catch (error) {
        uiStore.showSnackbar({ severity: 'error', message: error.message });
        throw Error(error);
      }
    }
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={USER_REGISTRATION_FORM_CONSTANTS.lastName.placeholder}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          name="email"
          value={formik.values.email}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          margin="normal"
          fullWidth
          id="mobile"
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        <TextField
          margin="normal"
          fullWidth
          id="city"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          margin="normal"
          fullWidth
          id="houseNumber"
          name="houseNumber"
          value={formik.values.houseNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.houseNumber && Boolean(formik.errors.houseNumber)}
          helperText={formik.touched.houseNumber && formik.errors.houseNumber}
        />
        <TextField
          margin="normal"
          fullWidth
          id="street"
          name="street"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.street && Boolean(formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
        <Button color="primary" variant="contained" onClick={() => uiStore.closeDialog()}>
          Cancel
        </Button>
      </form>
      <Snackbars />
    </Box>
  );
};

AccountProfile1.propTypes = {
  id: PropTypes.string
};

AccountProfile1.defaultProps = {
  id: null
};

export default observer(AccountProfile1);
