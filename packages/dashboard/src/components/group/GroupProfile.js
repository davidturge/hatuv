import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  Box, Button, Container, Link, TextField, Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import Group from '../../models/group';
import StoreContext from '../../store/store-context';

const GroupProfile = ({ id }) => {
  const { groupStore } = useContext(StoreContext);
  const [group, setGroup] = useState(new Group({}));

  useEffect(() => {
    if (id) {
      const getGroup = async () => {
        try {
          const currGroup = await groupStore.getById(id);
          setGroup(currGroup);
        } catch (e) {
          // setSnackbarProps({ open: true, severity: 'error', message: 'unable tp load group data' });
        }
      };
      getGroup();
    } else {
      // groupStore.setState('success');
    }
  }, []);

  return (
    <>
      {
        group
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
                    name: group.name
                  }}
                  validationSchema={Yup.object().shape({})}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                  enableReinitialize
                >
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    values
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          color="textPrimary"
                          variant="h2"
                        >
                          יצירת קבוצה
                        </Typography>
                      </Box>
                      <TextField
                        fullWidth
                        placeholder="כתובת "
                        margin="normal"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="name"
                        value={values.name}
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
    </>
  );
};

GroupProfile.propTypes = {
  id: PropTypes.string
};

export default observer(GroupProfile);
