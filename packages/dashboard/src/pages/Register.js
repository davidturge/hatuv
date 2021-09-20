import {
  Link as RouterLink, useNavigate, useParams
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography
} from '@material-ui/core';
import { PermissionEnum } from '../models/user';
import { decrypt } from '../utils/utils';
import { USER_FORM_CONSTANTS } from '../constants/forms';
import { passwordStrength } from '../utils/formValidations';
import { useStore } from '../store/store-context';

const Register = () => {
  const { uid } = useParams();
  const { userStore } = useStore();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Register</title>
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
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email(USER_FORM_CONSTANTS.email.validation.error)
                  .max(255).required(USER_FORM_CONSTANTS.email.validation.required),
                firstName: Yup.string().max(255).required(USER_FORM_CONSTANTS.firstName.validation.required),
                lastName: Yup.string().max(255).required(USER_FORM_CONSTANTS.lastName.validation.required),
                password: Yup.string().matches(passwordStrength, USER_FORM_CONSTANTS.password.validation.error)
                  .required(USER_FORM_CONSTANTS.password.validation.required),
                confirmPassword: Yup.string().required(USER_FORM_CONSTANTS.password.validation.required).when('password', {
                  is: (val) => (!!(val && val.length > 0)),
                  then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    USER_FORM_CONSTANTS.confirmPassword.validation.error
                  )
                }),
                policy: Yup.boolean().oneOf([true], 'נא לאשר את התקנון בבקשה')
              })
            }
            onSubmit={async (user) => {
              const { accountId, permission = PermissionEnum.GROUP_ADMIN } = decrypt(uid);
              try {
                await userStore.signup({ user, accountId, permission });
                navigate('/admin/dashboard');
              } catch (error) {
                throw Error(error);
              }
            }}
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
                <div dir="rtl">
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    placeholder={USER_FORM_CONSTANTS.firstName.placeholder}
                    margin="normal"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    dir="rtl"
                    value={values.firstName}
                    variant="outlined"
                  />
                </div>
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  placeholder={USER_FORM_CONSTANTS.lastName.placeholder}
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  placeholder={USER_FORM_CONSTANTS.email.placeholder}
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
                  placeholder={USER_FORM_CONSTANTS.password.placeholder}
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
                  placeholder={USER_FORM_CONSTANTS.confirmPassword.placeholder}
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
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

export default Register;
