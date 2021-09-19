import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography
} from '@material-ui/core';
import { useStore } from '../store/store-context';
// import { encrypt } from '../utils/utils';
import { ACCOUNT_REGISTRATION_FORM_CONSTANTS, USER_REGISTRATION_FORM_CONSTANTS } from '../constants/forms';
import { passwordStrength, phone } from '../utils/formValidations';
// import FileUploader from '../components/FileUploader';

const AccountRegistration = () => {
  const { accountStore } = useStore();
  // const [, setSelectedFile] = useState(null);

  const separateData = (data) => {
    const adminProps = {
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      password: 'password'
    };

    return Object.entries(data).reduce((res, [key, value]) => {
      // eslint-disable-next-line no-prototype-builtins
      if (adminProps.hasOwnProperty(key)) {
        if (key === 'email') {
          res.accountData.email = value;
        }
        res.userData[key] = value;
      } else if (key === 'companyName') {
        res.accountData.name = value;
      } else {
        res.accountData[key] = value;
      }
      return res;
    }, {
      userData: {},
      accountData: {}
    });
  };

  // const getAccountWithAddressObject = (account) => ({
  //   address: {
  //     city: account.city,
  //     houseNumber: account.houseNumber,
  //     street: account.street
  //   },
  //   ...account
  // });

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
          minHeight: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              companyEmail: '',
              companyName: '',
              phone: '',
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                companyName: Yup.string().max(255).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.companyName.validation.required),
                phone: Yup.string().matches(phone, ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.validation.error).required(ACCOUNT_REGISTRATION_FORM_CONSTANTS.phone.validation.required),
                email: Yup.string().email(USER_REGISTRATION_FORM_CONSTANTS.email.validation.required).max(255).required(USER_REGISTRATION_FORM_CONSTANTS.email.validation.required),
                firstName: Yup.string().max(255).required(USER_REGISTRATION_FORM_CONSTANTS.firstName.validation.required),
                lastName: Yup.string().max(255).required(USER_REGISTRATION_FORM_CONSTANTS.lastName.validation.required),
                password: Yup.string().matches(passwordStrength, USER_REGISTRATION_FORM_CONSTANTS.password.validation.error)
                  .required(USER_REGISTRATION_FORM_CONSTANTS.password.validation.required),
                confirmPassword: Yup.string().required(USER_REGISTRATION_FORM_CONSTANTS.password.validation.required).when('password', {
                  is: (val) => (!!(val && val.length > 0)),
                  then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    USER_REGISTRATION_FORM_CONSTANTS.confirmPassword.validation.error
                  )
                }),
                policy: Yup.boolean().oneOf([true], 'נא לאשר את התקנון בבקשה')
              })
            }
            onSubmit={async (values) => {
              const { accountData, userData } = separateData(values);
              await accountStore.save(accountData, userData);
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
                <Box>
                  <TextField
                    error={Boolean(touched.companyName && errors.companyName)}
                    fullWidth
                    helperText={touched.companyName && errors.companyName}
                    placeholder={ACCOUNT_REGISTRATION_FORM_CONSTANTS.companyName.placeholder}
                    margin="normal"
                    name="companyName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    dir="rtl"
                    value={values.companyName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    placeholder={USER_REGISTRATION_FORM_CONSTANTS.firstName.placeholder}
                    margin="normal"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    dir="rtl"
                    value={values.firstName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    placeholder={USER_REGISTRATION_FORM_CONSTANTS.lastName.placeholder}
                    margin="normal"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    dir="rtl"
                    value={values.lastName}
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
                    value={values.phone}
                    variant="outlined"
                  />

                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    placeholder={USER_REGISTRATION_FORM_CONSTANTS.email.placeholder}
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    placeholder={USER_REGISTRATION_FORM_CONSTANTS.password.placeholder}
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    fullWidth
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    placeholder={USER_REGISTRATION_FORM_CONSTANTS.confirmPassword.placeholder}
                    margin="normal"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.confirmPassword}
                    variant="outlined"
                  />
                  {/* <FileUploader */}
                  {/*  onFileSelectSuccess={(file) => setSelectedFile(file)} */}
                  {/*  onFileSelectError={({ error }) => alert(error)} */}
                  {/* /> */}
                </Box>
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
