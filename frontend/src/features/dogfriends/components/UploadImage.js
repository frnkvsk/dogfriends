import React from 'react';
import ImageUploading from 'react-images-uploading';
import photo_drop_zone from '../assets/photo_drop_zone.jpg';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import ResizeImage from './ResizeImage';

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
export function UploadImage({handleUploadImage}) {
  const classes = useStyles();
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
 
  const onChange = async (imageList, addUpdateIndex) => {
    // data for submit
    
    console.log(imageList, addUpdateIndex);
    
    const img = await ResizeImage(imageList, 200, 200);
    imageList[0].data_url = img;
    // console.log('UploadImage img',img)
    await setImages(imageList);
    console.log('img',img)
    console.log('imageList',imageList)
    // handleUploadImage(img)
  };
 
  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {!images.length &&
              <Container 
                className={classes.photoDrop}
                onClick={onImageUpload}
                {...dragProps}>
                  <p>Drag and drop photo or click to open.</p>
              </Container>
            }
            {/* <Container 
              className={classes.photoDrop}
              onClick={onImageUpload}
              {...dragProps}>
                <p>Drag and drop photo or click to open.</p>
            </Container> */}
            {/* <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button> */}
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" />
                {/* {width = image['data_url'].width} */}
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}