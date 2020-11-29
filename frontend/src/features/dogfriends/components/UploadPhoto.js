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



const useStyles = makeStyles((theme) => ({
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    height: '8rem',
    margin: '1rem',
    padding: '1rem',
    border: '2px dashed salmon',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#424242',
    active: {
      border: '2px solid rebeccapurple',
    },
  },
  instruction: {
    fontSize: '12px',
    fontStyle: 'italic',
    color: '#6d6d6d',
  }
  
}));


export default function UploadPhoto({token, setPhotoDetails}) {
  const classes = useStyles();

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log('UploadPhoto acceptedFiles',acceptedFiles)
    const url = process.env.REACT_APP_CLOUDINARY_BASE_URL+'upload';
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    try {
      const response = await postNewPhoto(url, formData, token);
      if(response.status === 200) {
        setPhotoDetails({
          photo_id: response.data.id,
          photo_url: response.data.url
        });
      } 
    } catch (error) {
      console.error('UploadPhoto err',error)
    }
    

    // console.log('UploadPhoto response',response)   
    // console.log('UploadPhoto response',response.data)
      
    // eslint-disable-next-line
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
        Photo Drop Zone
        <div className={classes.instruction}>Drag/Drop or Click to open.</div>
      </div>
    </>
  );
}

