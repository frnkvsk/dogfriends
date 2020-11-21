import React , { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dropzone: {
    height: '8rem',
    margin: '1rem',
    padding: '1rem',
    border: '2px dashed salmon',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    active: {
      border: '2px solid rebeccapurple',
    },
  },
  
}));

export default function UploadPhoto() {
  const classes = useStyles();
  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/dsxlpdoea/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append('file', acceptedFile);
      formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(url, {
        method: 'post',
        body: formData,
      });
      const data = await response.json();
      console.log('data',data)
    });
    
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop, 
    accepts: 'image/*',
    multiple: false,
  });

  return (
    <>
      <div className={classes.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        Drop Zone
      </div>
    </>
  );
}

