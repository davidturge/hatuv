import {
  Link as RouterLink, useNavigate, useParams
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography
} from '@material-ui/core';
import User, { PermissionEnum } from '../models/user';
import { useAuth } from '../store/auth-context';
import { decrypt } from '../utils/encryption';
import { USER_REGISTRATION_FORM_CONSTANTS } from '../constants/registration';

const Register = () => {
  const { uid } = useParams();
  const { signup } = useAuth();
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
          height: '100%',
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
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email(USER_REGISTRATION_FORM_CONSTANTS.email.validation.error)
                  .max(255).required(USER_REGISTRATION_FORM_CONSTANTS.email.validation.required),
                firstName: Yup.string().max(255).required(USER_REGISTRATION_FORM_CONSTANTS.firstName.validation.required),
                lastName: Yup.string().max(255).required(USER_REGISTRATION_FORM_CONSTANTS.lastName.validation.required),
                password: Yup.string().max(255).required(USER_REGISTRATION_FORM_CONSTANTS.password.validation.required),
                policy: Yup.boolean().oneOf([true], 'נא לאשר את התקנון בבקשה')
              })
            }
            onSubmit={async (values) => {
              const { accountId, permission = PermissionEnum.GROUP_ADMIN } = decrypt(uid);
              const user = new User({
                ...values, accountId, permission
              });
              try {
                await signup(user, values.password);
                navigate('/admin/dashboard');
              } catch (error) {
                console.log(error);
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
                    placeholder={USER_REGISTRATION_FORM_CONSTANTS.firstName.placeholder}
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
                  placeholder={USER_REGISTRATION_FORM_CONSTANTS.lastName.placeholder}
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
