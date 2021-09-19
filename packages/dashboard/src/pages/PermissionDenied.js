import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';

const PermissionDenied = () => (
  <>
    <Helmet>
      <title>404 | Material Kit</title>
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
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          המשתמש שלך אינו פעיל אנא פנה למנהל החשבון לצורך בירור
        </Typography>
      </Container>
    </Box>
  </>
);

export default PermissionDenied;
