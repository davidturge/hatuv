import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import PropTypes from 'prop-types';
import { useStore } from '../../store/store-context';
import AccountProfile1 from './AccountProfile1';

const AccountListToolbar = ({ selectedAccountIds, ...rest }) => {
  const { accountStore } = useStore();
  const { uiStore } = useStore();
  const onRemoveAccountsClicked = () => {
    accountStore.delete(selectedAccountIds);
  };

  const onUpdateAccountsClicked = () => {
    const id = selectedAccountIds[0] || null;
    uiStore.showDialog({ title: 'Update Account', body: <AccountProfile1 id={id} /> });
  };

  return (
    <Box {...rest}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          disabled={selectedAccountIds.length === 0}
          onClick={onRemoveAccountsClicked}
        >
          הסר
        </Button>

        <Button
          color="primary"
          variant="contained"
          disabled={selectedAccountIds.length > 1 || selectedAccountIds.length === 0}
          onClick={onUpdateAccountsClicked}
        >
          עדכן
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search account"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

AccountListToolbar.propTypes = {
  selectedAccountIds: PropTypes.array
};
export default AccountListToolbar;
