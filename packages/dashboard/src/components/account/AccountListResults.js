import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useGridUtils from '../../hooks/useGridUtils';
import { StyledTableCell } from '../TableStyles';

const AccountListResults = ({ accounts, entitiesState }) => {
  const {
    selectedEntitiesIds,
    limit,
    page,
    handleSelectAll,
    handleSelectOne,
    handleLimitChange,
    handlePageChange
  } = useGridUtils(accounts, entitiesState);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    checked={selectedEntitiesIds.length === accounts.size}
                    color="primary"
                    indeterminate={
                      selectedEntitiesIds.length > 0
                      && selectedEntitiesIds.length < accounts.size
                    }
                    onChange={handleSelectAll}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  שם
                </StyledTableCell>
                <StyledTableCell>
                  טלפון
                </StyledTableCell>
                <StyledTableCell>
                  מספר קבוצות
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(accounts).map(([, account]) => (
                <TableRow
                  hover
                  key={account.id}
                  selected={selectedEntitiesIds.indexOf(account.id) !== -1}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEntitiesIds.indexOf(account.id) !== -1}
                      onChange={(event) => handleSelectOne(event, account.id)}
                      value="true"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {account.name}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {account.phone}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {account.groups.length}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={accounts.size}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AccountListResults.propTypes = {
  accounts: PropTypes.object,
  entitiesState: PropTypes.object
};

AccountListResults.defaultProps = {
  accounts: []
};

export default observer(AccountListResults);
