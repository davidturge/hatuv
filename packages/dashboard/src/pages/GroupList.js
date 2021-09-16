import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import GroupListToolbar from '../components/group/GroupListToolbar';
import GroupListResults from '../components/group/GroupListResults';
import { useStore } from '../store/store-context';

const GroupList = () => {
  const [selectedEntitiesIds, setSelectedEntitiesIds] = useState([]);
  const { groupStore } = useStore();

  useEffect(() => {
    const getGroups = async () => {
      await groupStore.getAll();
    };
    getGroups();
    return () => {
      groupStore.setState('pending');
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>קבוצות</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <GroupListToolbar selectedGroupsIds={selectedEntitiesIds} />
          <Box sx={{ pt: 3 }}>
            <GroupListResults
              groups={groupStore.groups}
              entitiesState={{ selectedEntitiesIds, setSelectedEntitiesIds }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default GroupList;
