import React, { useState } from 'react';
import photo_drop_zone from '../assets/photo_drop_zone.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '6px 0 6px 0',
  },
  photoDrop: {
    backgroundImage: `url(${photo_drop_zone})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '5px',
    width: '388px',
    height: '370px',
    borderRadius: '7px',
    cursor: 'pointer',  
    border: '2px dotted salmon',      
  },
  errorMsg: {
    color: 'red',
  }    
}));

const fileReader = new FileReader();

export function UploadImage({handleUploadImage, width, height}) {
  const classes = useStyles();
  const [newImage, setNewImage] = useState('');
  const [fileUploadError, setFileUploadError] = useState('');

  fileReader.onload = function (event) {  
    let image = new Image();
    image.onload = async function(){
        if(image.width > image.height) {      
          if(width < image.width) {
            height = Math.floor(image.height*(width/image.width));
          } else {
            width = image.width;
            height = image.height;
          }      
        } else {
          if(height < image.height) {
            width = Math.floor(image.width*(width/image.height))       
          } else {
            width = image.width;
            height = image.height;
          } 
        }
        let canvas=document.createElement('canvas');
        let context=canvas.getContext('2d');
        canvas.width=width;
        canvas.height=height;
        context.drawImage(image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
        setNewImage(canvas.toDataURL());
        handleUploadImage(canvas, canvas.toDataURL('image/jpeg', 0.8));
    }
    image.src=event.target.result;
  };

  const loadFile = () => {
    setFileUploadError('');
    const filterTypes = new RegExp('image/gif|image/jpeg|image/jpg|image/png|webp', 'i');
    if(!document.getElementById('uploadImage').files.length) {
      setFileUploadError('Error loading file.');
      return;
    } 
    const uploadFile = document.getElementById('uploadImage').files[0];
    
    if (!filterTypes.test(uploadFile.type)) {
      setFileUploadError('Incorrect file type. File types include gif, jpeg, jpg, png.');
      return;
    }    
    fileReader.readAsDataURL(uploadFile);
    // eslint-disable-next-line
  }
  
  return (
    <div className={classes.form}>
      {fileUploadError.length ? <p className={classes.errorMsg}>{fileUploadError}</p> : ''}
      <input 
        className={newImage.length ? '' : classes.photoDrop}
        id='uploadImage' 
        type='file'
        onChange={loadFile}/>
    </div>
  );
}