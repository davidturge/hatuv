import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography
} from '@material-ui/core';
import Account from '../models/account';
import { useStore } from '../store/store-context';
import { encrypt } from '../utils/encryption';
import { ACCOUNT_REGISTRATION_FORM_CONSTANTS } from '../constants/forms';

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const AccountRegistration = () => {
  const navigate = useNavigate();
  const { accountStore } = useStore();

  return (
    <>
      <Helmet>
        <title>Account Registration</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              name: '',
              phone: '',
              mobile: '',
              city: '',
              houseNumber: '',
              street: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email(ACCOUNT_REGISTRATION_FORM_CONSTANTS.email.validation.error).max(255).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.email.validation.required),
                name: Yup.string().max(255).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.name.validation.required),
                phone: Yup.string().matches(phoneRegex, ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.validation.error).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.validation.required),
                mobile: Yup.string().matches(phoneRegex, ACCOUNT_REGISTRATION_FORM_CONSTANTS.mobile.validation.error).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.mobile.validation.required),
                city: Yup.string().required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.city.validation.required),
                houseNumber: Yup.number().required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.houseNumber.validation.required),
                street: Yup.string().required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.street.validation.required),
                policy: Yup.boolean().oneOf([true], 'נא לאשר את התקנון בבקשה')
              })
            }
            onSubmit={async (values) => {
              const newAccount = new Account({
                address: {
                  city: values.city,
                  houseNumber: values.houseNumber,
                  street: values.street
                },
                ...values
              });
              const id = await accountStore.save(newAccount);
              navigate(`/register/${encrypt({ accountId: id, permission: 0 })}`);
            }}
            enableReinitialize
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    צור חשבון חדש
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.name.placeholder}
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  dir="rtl"
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.email.placeholder}
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.placeholder}
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="phone"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.mobile && errors.mobile)}
                  fullWidth
                  helperText={touched.mobile && errors.mobile}
                  placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.mobile.placeholder}
                  margin="normal"
                  name="mobile"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="phone"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.city && errors.city)}
                  fullWidth
                  helperText={touched.city && errors.city}
                  placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.city.placeholder}
                  margin="normal"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.houseNumber && errors.houseNumber)}
                  fullWidth
                  helperText={touched.houseNumber && errors.houseNumber}
                  placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.houseNumber.placeholder}
                  margin="normal"
                  name="houseNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.street && errors.street)}
                  fullWidth
                  helperText={touched.street && errors.street}
                  placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.street.placeholder}
                  margin="normal"
                  name="street"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    הרשמה
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  האם יש לך חשבון ?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    התחבר
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default AccountRegistration;
