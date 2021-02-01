import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: '1px solid green',
  },
  
}));
function NewPhotoForm({handleUploadImage}) {
  const classes = useStyles();
  const [img, setImg] = useState('');

  return (
    <form className={classes.root}>
      <ImageUploader
        key='image-uploader'
        withIcon='true'
        singleImage='true'
        withPreview='true'
        label='Maximum size file: 5MB'
        buttonText='Choose an image'
        onChange={handleUploadImage}
        imgExtension={['.jpg', '.png', '.gif']}
        maxFileSize={5242880}></ImageUploader>
    </form>
  );
}

export default NewPhotoForm;
