import React, { useEffect, useState } from 'react';
// import ImageUploading from 'react-images-uploading';
import photo_drop_zone from '../assets/photo_drop_zone.jpg';
// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

// import ResizeImage from './ResizeImage';

const useStyles = makeStyles((theme) => ({
  photoDrop: {
    backgroundImage: `url(${photo_drop_zone})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '400px',
    height: '370px',
    border: '2px dotted salmon',
    margin: '100px',
    cursor: 'pointer',    
  }
    
}));

const fileReader = new FileReader();

export function UploadImage({handleUploadImage, width, height}) {
  const classes = useStyles();
  const [origImage, setOrigImage] = useState('');
  const [newImage, setNewImage] = useState('');

  fileReader.onload = function (event) {    
    var image = new Image();
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
        var canvas=document.createElement("canvas");
        var context=canvas.getContext("2d");
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
        handleUploadImage(canvas.toDataURL());
    }
    image.src=event.target.result;
  };

  useEffect(() => {
    const filterTypes = new RegExp('image/gif|image/jpeg|image/jpg|image/png|webp', 'i');
    const uploadImage = document.getElementById("upload-Image");
    
    //check and retuns the length of uploded file.
    if (uploadImage.files.length === 0) { 
      return; 
    }
    
    //Is Used for validate a valid file.
    const uploadFile = document.getElementById("upload-Image").files[0];
    if (!filterTypes.test(uploadFile.type)) {
      alert("Please select a valid image."); 
      return;
    }
    
    fileReader.readAsDataURL(uploadFile);
    // eslint-disable-next-line
  }, [fileReader, origImage]);
  
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <input 
                className={newImage.length ? '' : classes.photoDrop}
                id="upload-Image" 
                type="file"
                onChange={(e) => setOrigImage(e.target.value)}/>
            </td>
          </tr>
          {newImage.length ?
            <tr>
              <td><img id="upload-Preview" src={newImage} alt='resized limage'/></td>
            </tr>
            :
            <tr></tr>
          }      
        </tbody>
      </table>
    </>
  )
}