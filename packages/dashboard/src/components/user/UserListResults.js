import React, { useState } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import {
  Box, Card, CardContent, InputAdornment, SvgIcon, TextField
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useStore } from '../../store/store-context';
import { getInitials } from '../../utils/utils';
import { AvatarLetterCell } from '../cells/AvatarCell';
import SwitchCell from '../cells/SwitchCell';
import useWindowResize from '../../hooks/useWindowResize';
import { GENERAL_GRID_OPTIONS, GRID_DEFAULT_DEFS, GRID_USER_COLUMN_DEFS } from '../../constants/grids';

const UserListResults = ({ users }) => {
  const [gridApi, setGridApi] = useState(null);
  const { uiStore, userStore } = useStore();
  const { height } = useWindowResize(292);

  const rowData = Array.from(users, ([, value]) => ({
    initials: getInitials(`${value.firstName} ${value.lastName}`),
    groupsCount: value.groups.length,
    ...value
  }));

  const onGridSizeChanged = (data) => {
    if (data.clientWidth < 700) {
      data.columnApi.setColumnsVisible(['email', 'groupsCount', 'active'], false);
    } else {
      data.columnApi.setColumnsVisible(['email', 'groupsCount', 'active'], true);
    }
  };

  const onGridReady = ({ api }) => {
    setGridApi(api);
    api.showLoadingOverlay();
  };

  const onFilterTextBoxChanged = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  const onRowSelected = () => {
    const nodes = gridApi.getSelectedNodes();
    const data = nodes.map((node) => node.data);
    uiStore.setSelectedEntities(data);
  };

  const onActiveChanged = (data, isActive) => {
    userStore.update({ ...data, active: isActive });
  };

  const gridOptions = {
    ...GENERAL_GRID_OPTIONS,
    defaultColDef: GRID_DEFAULT_DEFS,
    onGridSizeChanged,
    columnDefs: GRID_USER_COLUMN_DEFS(onActiveChanged)
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                onChange={onFilterTextBoxChanged}
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
      <div className="ag-theme-alpine" style={{ height, width: '100%' }}>
        <AgGridReact
          onGridReady={onGridReady}
          rowData={rowData}
          gridOptions={gridOptions}
          onRowSelected={onRowSelected}
          frameworkComponents={{
            avatarCellRenderer: AvatarLetterCell,
            switchCellRenderer: SwitchCell
          }}
        />
      </div>
    </>
  );
};

UserListResults.propTypes = {
  users: PropTypes.object
};

UserListResults.defaultProps = {
  users: {}
};

export default observer(UserListResults);
