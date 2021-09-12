import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  Alert,
  Box, Button, Container, Link, Snackbar, TextField, Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import User from '../../models/user';
import StoreContext from '../../store/store-context';

const UserProfile = ({ id = null }) => {
  const { userStore } = useContext(StoreContext);
  const [user, setUser] = useState(new User({}));
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    severity: '',
    message: ''
  });

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        try {
          const currUser = await userStore.getById(id);
          setUser(currUser);
        } catch (e) {
          setSnackbarProps({ open: true, severity: 'error', message: 'unable tp load user data' });
        }
      };
      getUser();
    } else {
      userStore.setState('success');
    }
  }, []);

  const handleClose = () => {
    setSnackbarProps({ open: false });
  };

  return (
    <>
      {
        userStore.state === 'success'
        && (
        <>
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
                  email: user.email,
                  password: user.password
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={(values) => {
                  console.log(values);
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
                        יצירת משתמש
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      placeholder="כתובת מייל"
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
                      placeholder="סיסמא"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box sx={{ py: 2 }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        התחבר
                      </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      {' '}
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="h6"
                      />
                    </Typography>
                  </form>
                )}
              </Formik>
            </Container>
          </Box>
        </>
        )
      }
      <Snackbar open={snackbarProps.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarProps.severity}>
          {snackbarProps.message}
        </Alert>
      </Snackbar>
    </>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string
};

export default observer(UserProfile);
