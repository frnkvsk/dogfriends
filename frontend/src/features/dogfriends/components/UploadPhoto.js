import React , { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';
import {
  postPhotoNew
} from '../dogfriendsPhotosSlice';

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

export default function UploadPhoto({setUrl}) {
  const classes = useStyles();

  const onDrop = useCallback(async (acceptedFiles) => {
    const response = await postPhotoNew(acceptedFiles);
    const data = await response.json();

    console.log('UploadPhoto data',data)   
    
  }, [setUrl]);

  const {getRootProps, getInputProps} = useDropzone({
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

