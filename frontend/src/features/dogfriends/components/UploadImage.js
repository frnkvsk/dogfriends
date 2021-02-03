import React, { useEffect, useState } from 'react';
import photo_drop_zone from '../assets/photo_drop_zone.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '20px 0 20px 0',
    // border: '1px solid red',
  },
  photoDrop: {
    backgroundImage: `url(${photo_drop_zone})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '400px',
    height: '370px',
    border: '2px dotted salmon',
    cursor: 'pointer',    
  }
    
}));

const fileReader = new FileReader();

export function UploadImage({handleUploadImage, width, height}) {
  const classes = useStyles();
  const [origImage, setOrigImage] = useState('');
  const [newImage, setNewImage] = useState('');

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
        let canvas=document.createElement("canvas");
        let context=canvas.getContext("2d");
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
    <div className={classes.form}>
      <input 
        className={newImage.length ? '' : classes.photoDrop}
        id="upload-Image" 
        type="file"
        onChange={(e) => setOrigImage(e.target.value)}/>
    </div>
  )
  // return (
  //   <>
  //     <table>
  //       <tbody>
  //         <tr>
  //           <td>
  //             <input 
  //               className={newImage.length ? '' : classes.photoDrop}
  //               id="upload-Image" 
  //               type="file"
  //               onChange={(e) => setOrigImage(e.target.value)}/>
  //           </td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </>
  // )
}