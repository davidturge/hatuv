import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import React from 'react';

const AvatarCell = ({ value }) => (
  <Avatar
    src={value}
    sx={{
      height: 50,
      width: 50
    }}
  />
);

AvatarCell.propTypes = {
  value: PropTypes.string,
};

export default AvatarCell;
