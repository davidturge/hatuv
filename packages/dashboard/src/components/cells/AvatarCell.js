import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';

export const AvatarImageCell = ({ value: imageSrc }) => (
  <Avatar
    src={imageSrc}
    sx={{
      height: 50,
      width: 50
    }}
  />
);

AvatarImageCell.propTypes = {
  value: PropTypes.string,
};

export const AvatarLetterCell = ({ value: letters }) => {
  // const colors = ['#031944', '#DD482D', '#F0BB31', '#0F6988', '#031944', '#DD482D', '#F0BB31', '#0F6988'];
  const [itemColor] = useState('#0F6988');

  return (
    <Avatar
      sx={{
        background: itemColor,
        height: 50,
        width: 50
      }}
    >
      {letters}
    </Avatar>
  );
};

AvatarLetterCell.propTypes = {
  value: PropTypes.string,
};
