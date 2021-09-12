import { useState } from 'react';

const useGridUtils = (entities, { selectedEntitiesIds, setSelectedEntitiesIds }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedEntityIds;
    if (event.target.checked) {
      newSelectedEntityIds = Array.from(entities).map(([key]) => key);
    } else {
      newSelectedEntityIds = [];
    }
    setSelectedEntitiesIds(newSelectedEntityIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEntitiesIds.indexOf(id);
    let newSelectedEntityIds = [];

    if (selectedIndex === -1) {
      newSelectedEntityIds = newSelectedEntityIds.concat(selectedEntitiesIds, id);
    } else if (selectedIndex === 0) {
      newSelectedEntityIds = newSelectedEntityIds.concat(selectedEntitiesIds.slice(1));
    } else if (selectedIndex === selectedEntitiesIds.length - 1) {
      newSelectedEntityIds = newSelectedEntityIds.concat(selectedEntitiesIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedEntityIds = newSelectedEntityIds.concat(
        selectedEntitiesIds.slice(0, selectedIndex),
        selectedEntitiesIds.slice(selectedIndex + 1)
      );
    }

    setSelectedEntitiesIds(newSelectedEntityIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return {
    handleSelectAll,
    handleLimitChange,
    handlePageChange,
    handleSelectOne,
    selectedEntitiesIds,
    limit,
    page
  };
};

export default useGridUtils;
