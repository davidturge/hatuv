import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStore } from '../../store/store-context';
import GroupProfile from './GroupProfile';

const editGroup = 'ערוך קבוצה';
const addGroup = 'הוסף קבוצה';

const GroupListToolbar = ({ selectedGroupsIds }) => {
  const { uiStore } = useStore();
  const onEditGroupClicked = () => {
    const id = selectedGroupsIds[0] || null;
    const title = id ? editGroup : addGroup;
    uiStore.showDialog(title, <GroupProfile id={id} />);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          disabled={!(selectedGroupsIds.length <= 1)}
          onClick={onEditGroupClicked}
        >
          הוסף קבוצה
        </Button>
      </Box>
    </Box>
  );
};

GroupListToolbar.propTypes = {
  selectedGroupsIds: PropTypes.array
};
export default GroupListToolbar;
