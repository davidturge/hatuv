import React, { useState } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import {
  Box, Card, CardContent, InputAdornment, SvgIcon, TextField
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useStore } from '../../store/store-context';
import useWindowResize from '../../hooks/useWindowResize';
import { GENERAL_GRID_OPTIONS, GRID_DEFAULT_DEFS, GRID_GROUP_COLUMN_DEFS } from '../../constants/grids';

const GridListResults = ({ groups, state }) => {
  const [gridApi, setGridApi] = useState(null);
  const { uiStore } = useStore();
  const { height } = useWindowResize(292);

  const rowData = Array.from(groups, ([, value]) => ({
    tvsCount: value.tvs.length,
    ...value
  }));

  if (gridApi) {
    if (state === 'done') {
      gridApi.hideOverlay();
    } else {
      gridApi.showLoadingOverlay();
    }
  }

  const onGridSizeChanged = (data) => {
    if (data.clientWidth < 700) {
      data.columnApi.setColumnsVisible([], false);
    } else {
      data.columnApi.setColumnsVisible([], true);
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

  const gridOptions = {
    ...GENERAL_GRID_OPTIONS,
    defaultColDef: GRID_DEFAULT_DEFS,
    onGridSizeChanged,
    columnDefs: GRID_GROUP_COLUMN_DEFS
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
        />
      </div>
    </>
  );
};

GridListResults.propTypes = {
  groups: PropTypes.any,
  state: PropTypes.string
};

GridListResults.defaultProps = {
  groups: null,
  state: 'pending'
};

export default observer(GridListResults);
