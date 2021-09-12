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

const GroupListResults = ({ groups, entitiesState }) => {
  const {
    selectedEntitiesIds,
    limit,
    page,
    handleSelectAll,
    handleSelectOne,
    handleLimitChange,
    handlePageChange
  } = useGridUtils(groups, entitiesState);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    checked={selectedEntitiesIds.length === groups.length}
                    color="primary"
                    indeterminate={
                        selectedEntitiesIds.length > 0
                        && selectedEntitiesIds.length < groups.length
                      }
                    onChange={handleSelectAll}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  שם
                </StyledTableCell>
                <StyledTableCell>
                  מספר טלוויזיות
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(groups).map(([, group]) => (
                <TableRow
                  hover
                  key={group.id}
                  selected={selectedEntitiesIds.indexOf(group.id) !== -1}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEntitiesIds.indexOf(group.id) !== -1}
                      onChange={(event) => handleSelectOne(event, group.id)}
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
                        {group.name}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {group.tvs.length}
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
        count={groups.size}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GroupListResults.propTypes = {
  groups: PropTypes.object,
  entitiesState: PropTypes.object
};

GroupListResults.defaultProps = {
  groups: []
};

export default observer(GroupListResults);
