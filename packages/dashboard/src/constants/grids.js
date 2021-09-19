export const GENERAL_GRID_OPTIONS = {
  enableRtl: true,
  suppressRowClickSelection: true,
  rowSelection: 'multiple',
  rowHeight: 60,
  overlayMessage: 'טעינה...'
};

export const GRID_DEFAULT_DEFS = {
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
};

export const GRID_ACCOUNT_COLUMN_DEFS = [
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
    field: 'groupsCount',
    headerName: 'קבוצות',
    width: 50,
  }
];

export const GRID_USER_COLUMN_DEFS = (onActiveChanged) => [
  {
    field: 'initials',
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
    field: 'firstName',
    headerName: 'שם פרטי',
    width: 100,
    minWidth: 100,
    maxWidth: 140
  },
  {
    field: 'lastName',
    headerName: 'שם משפחה',
    width: 120,
    minWidth: 150
  },
  {
    field: 'email',
    headerName: 'דוא"ל',
    width: 150,
  },
  {
    field: 'groupsCount',
    headerName: 'קבוצות',
    width: 50,
  },
  {
    field: 'active',
    headerName: 'פעיל',
    width: 50,
    cellRenderer: 'switchCellRenderer',
    cellRendererParams: { onActiveChanged },
  }
];
