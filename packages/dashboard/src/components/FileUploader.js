import React, { useRef, useState } from 'react';
import { Button, Stack } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { PhotoCamera } from '@material-ui/icons';

const Input = styled('input')({
  display: 'none',
});

const FileUploader = ({ onFileSelectError, onFileSelectSuccess }) => {
  const [fileName, setFileName] = useState(null);
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    if (file.size > 1024) {
      setFileName(file.name);
      onFileSelectSuccess(file);
    } else {
      onFileSelectError({ error: 'File size cannot exceed more than 1MB' });
    }
  };

  return (
    <Stack>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileInput}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<PhotoCamera />}
          onClick={() => fileInput.current && fileInput.current.click()}
        >
          {fileName || 'Upload'}
        </Button>
      </label>
    </Stack>
  );
};

FileUploader.propTypes = {
  onFileSelectError: PropTypes.func,
  onFileSelectSuccess: PropTypes.func
};

FileUploader.defaultProps = {
  onFileSelectError: null,
  onFileSelectSuccess: null
};

export default FileUploader;
