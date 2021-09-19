import React, { useState } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import {
  Box, Card, CardContent, InputAdornment, SvgIcon, TextField
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { AvatarImageCell } from '../cells/AvatarCell';
import { useStore } from '../../store/store-context';
import { ACCOUNT_COLUMN_DEFS } from '../../constants/grids';
import useWindowResize from '../../hooks/useWindowResize';

const AccountListResults = ({ accounts }) => {
  const [gridApi, setGridApi] = useState(null);
  const { uiStore } = useStore();
  const { height } = useWindowResize(292);

  const rowData = Array.from(accounts, ([, value]) => ({
    groupsCount: value.groups.length,
    ...value
  }));

  if (rowData.length > 0 && gridApi) {
    gridApi.hideOverlay();
  }

  const onGridSizeChanged = (data) => {
    if (data.clientWidth < 700) {
      data.columnApi.setColumnsVisible(['phone', 'groupsCount'], false);
    } else {
      data.columnApi.setColumnsVisible(['phone', 'groupsCount'], true);
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
    enableRtl: true,
    suppressRowClickSelection: true,
    rowSelection: 'multiple',
    rowHeight: 60,
    defaultColDef: {
      sortable: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
      columnsMenuParams: {
        suppressSyncLayoutWithGrid: true
      },
      cellStyle: {
        display: 'flex',
        alignItems: 'center'
      }
    },
    overlayLoadingTemplate: 'טעינה ...',
    onGridSizeChanged,
    columnDefs: ACCOUNT_COLUMN_DEFS
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
            avatarCellRenderer: AvatarImageCell
          }}
        />
      </div>
    </>
  );
};

AccountListResults.propTypes = {
  accounts: PropTypes.object
};

AccountListResults.defaultProps = {
  accounts: []
};

export default observer(AccountListResults);
