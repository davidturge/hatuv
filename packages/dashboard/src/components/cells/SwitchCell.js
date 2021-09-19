import React from 'react';
import { Switch } from '@material-ui/core';
import PropTypes from 'prop-types';

const SwitchCell = ({ data, value: isActive, onActiveChanged }) => {
  const [checked, setChecked] = React.useState(isActive);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onActiveChanged(data, event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

SwitchCell.propTypes = {
  value: PropTypes.bool,
  onActiveChanged: PropTypes.func,
  data: PropTypes.object
};

export default SwitchCell;
