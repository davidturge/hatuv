import React, { useState } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  Box, Card, CardContent, InputAdornment, SvgIcon, TextField
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AvatarCell from './AvatarCell';
import { useStore } from '../../store/store-context';

const AccountListResults = ({ accounts }) => {
  const [gridApi, setGridApi] = useState(null);
  const { uiStore } = useStore();

  const rowData = Array.from(accounts, ([, value]) => ({
    city: value.address.city,
    street: `${value.address.street} ${value.address.houseNumber}`,
    groupNumber: value.groups.length,
    ...value
  }));

  const onGridSizeChanged = (data) => {
    if (data.clientWidth < 700) {
      data.columnApi.setColumnsVisible(['phone', 'mobile', 'city', 'street', 'groupNumber'], false);
    } else {
      data.columnApi.setColumnsVisible(['phone', 'mobile', 'city', 'street', 'groupNumber'], true);
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
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
    },
    onGridSizeChanged,
    columnDefs: [
      {
        field: 'logo',
        headerName: '',
        width: 100,
        minWidth: 100,
        maxWidth: 140,
        cellRenderer: 'avatarCellRenderer',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        field: 'name',
        headerName: 'שם',
        width: 120,
        minWidth: 150,
        suppressSizeToFit: true
      },
      {
        field: 'phone',
        headerName: 'טלפון',
        width: 150,
      },
      {
        field: 'mobile',
        headerName: 'נייד',
        width: 150
      },
      {
        field: 'city',
        headerName: 'עיר',
        width: 150,
      },
      {
        field: 'street',
        headerName: 'רחוב',
        width: 150,
      },
      {
        field: 'groupNumber',
        headerName: 'קבוצות',
        width: 50,
      }
    ]
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
      <div className="ag-theme-alpine" style={{ height: uiStore.windowDimensions.height, width: '100%' }}>
        <AgGridReact
          onGridReady={onGridReady}
          rowData={rowData}
          gridOptions={gridOptions}
          onRowSelected={onRowSelected}
          frameworkComponents={{
            avatarCellRenderer: AvatarCell
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
