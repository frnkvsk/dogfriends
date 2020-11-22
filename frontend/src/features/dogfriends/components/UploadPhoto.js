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

export default function UploadPhoto({setUrl}) {
  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    const url = process.env.REACT_APP_CLOUDINARY_BASE_URL+'upload';

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append('file', acceptedFile);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

      // const response = await fetch(url, {
      //   method: 'post',
      //   body: formData,
      // });
      // const data = await response.json();
      // // console.log('UploadPhoto data',data)
      // console.log('UploadPhoto data.url',data.url)
      // setUrl(data.url)
      setUrl("http://res.cloudinary.com/dsxlpdoea/image/upload/v1605993605/photo-1544568100-847a948585b9_evaw8c.jpg")
    });
    
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

