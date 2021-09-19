export const GENERAL_GRID_CONSTANTS = {
  overlayMessage: 'טעינה...'
};

export const ACCOUNT_COLUMN_DEFS = [
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

export const USER_COLUMN_DEFS = (onActiveChanged) => [
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
