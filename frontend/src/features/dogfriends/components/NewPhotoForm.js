import React from 'react';
import ImageUploader from 'react-images-upload';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: '1px solid red',
  },
  
}));
function NewPhotoForm(props) {
  const classes = useStyles();
  return (
    <form className={classes.root}>
      <ImageUploader
        key='image-uploader'
        withIcon='true'
        singleImage='true'
        withPreview='true'
        label='Maximum size file: 5MB'
        buttonText='Choose and image'
        onChange={props.handleSetUrl}
        imgExtension={['.jpg', '.png', '.jpeg']}
        maxFileSize={5242880}></ImageUploader>
    </form>
  );
}

export default NewPhotoForm;
