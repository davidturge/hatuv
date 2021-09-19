import { Helmet } from 'react-helmet';
import {
  Alert, Box, Container, Stack
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useAuth } from '../store/auth-context';
import { PermissionEnum } from '../models/user';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiAlert-icon': {
      paddingLeft: '12px'
    }
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { currentUser: { account: { logo = null } = {} }, permission = {} } = useAuth() || {};
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          {!logo && permission === PermissionEnum.ACCOUNT_ADMIN
          && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert className={classes.root} variant="outlined" severity="info">
              לא הגדרת את תמונת הלוגו שלך
              {' '}
              <strong>לחץ כאן כדי להוסיף אותה</strong>
            </Alert>
          </Stack>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
