import React , { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';
// import {
//   postPhotoNew
// } from '../dogfriendsPhotosSlice';

import {
  postNewPhoto,
  // postDestroyPhoto
} from '../api/DogfriendsPhotosApi';


// import axios from 'axios';


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


export default function UploadPhoto({token}) {
  const classes = useStyles();

  const onDrop = useCallback(async (acceptedFiles, setUrl) => {
    console.log('UploadPhoto acceptedFiles',acceptedFiles)
    const url = process.env.REACT_APP_CLOUDINARY_BASE_URL+'upload';
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    const response = await postNewPhoto(url, formData, token);

    console.log('UploadPhoto response',response)   
    // console.log('UploadPhoto response',response.data)
    if(response.status === 200) {
      setUrl(response.data.url)
    }   
    
  }, [token]);

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

