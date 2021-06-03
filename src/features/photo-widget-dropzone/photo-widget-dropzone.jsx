import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

const PhotoWidgetDropzone = ({ setFiles }) => {
  const dropZoneStyles = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center',
  };

  const dropZoneActive = {
    border: 'dashed 3px green',
  };
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file), // preview the image
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={isDragActive ? { ...dropZoneStyles, ...dropZoneActive } : dropZoneStyles}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
};

export default PhotoWidgetDropzone;
