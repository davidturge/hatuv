import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store-context';
import { ACCOUNT_REGISTRATION_FORM_CONSTANTS } from '../../constants/forms';
import { phone } from '../../utils/formValidations';

const AccountProfile1 = ({ id, closeDialog, showSnackbar }) => {
  const { accountStore } = useStore();
  const initialAccountValue = {
    name: '',
    email: '',
    phone: '',
    mobile: ''
  };
  const account = id ? {
    ...accountStore.accounts.get(id),
    city: accountStore.accounts.get(id).address.city,
    houseNumber: accountStore.accounts.get(id).address.houseNumber,
    street: accountStore.accounts.get(id).address.street
  } : initialAccountValue;

  const setAddressOnSave = (data) => {
    const newAccount = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === 'city' || key === 'street' || key === 'houseNumber') {
        // eslint-disable-next-line no-prototype-builtins
        if (!acc.hasOwnProperty('address')) {
          acc.address = { [key]: value };
        } else {
          acc.address[key] = value;
        }
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
    return newAccount;
  };

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
    initialValues: account,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.id) {
          await accountStore.update(values);
          showSnackbar({ severity: 'success', message: 'חשבון עודכן בהצלחה' });
        } else {
          const newAccount = setAddressOnSave(values);
          accountStore.save(newAccount);
          showSnackbar({ severity: 'success', message: 'חשבון נוסף בהצלחה' });
        }
        closeDialog();
      } catch (error) {
        showSnackbar({ severity: 'error', message: error.message });
        throw Error(error);
      }
    }
  });

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
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.name.placeholder}
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
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.email.placeholder}
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
          <TextField
            margin="normal"
            fullWidth
            id="mobile"
            name="mobile"
            value={formik.values.mobile}
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.mobile.placeholder}
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
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.city.placeholder}
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
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.houseNumber.placeholder}
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
            placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.street.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />
          <Button color="primary" variant="contained" type="submit">
            שמור
          </Button>
          <Button color="primary" variant="contained">
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
