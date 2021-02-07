import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  TextField,
} from '@material-ui/core';
import {
  postInitInfoData
} from '../dogfriendsInitSlice';
import { 
  addNewPost,
 } from '../dogfriendsPostsSlice';
import { AuthContext } from '../context/AuthContext';

import {UploadImage} from './UploadImage';

import { v4 as uuid } from 'uuid';
import { FillTextImage } from './FillTextImage';
import { putNewPhoto } from '../api/DogfriendsPhotosApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    margin: '30px 0 20px 0',
    padding: '15px',
    border: '2px solid #eceff1',
  },
  control: {
    display: 'flex',    
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formItem: {
    margin: '5px 0 5px 0',
  },
  imagePreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '400px',
    maxHeight: '400px',
    // marginLeft: '7px',
  }

}));
// const SetImageText = (image, topText, bottomText, color) => {
//   return useDrawImageText(image, topText, bottomText, color);
// }
const NewPostForm = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  
  
  const dispatch = useDispatch();
  let initInfo;// = dispatch(postInitInfoData({_token: auth.authState.token}));
  console.log('NewPostForm initInfo',initInfo)
  const history = useHistory();
  // console.log('NewPostForm auth',auth)
  const [title, setTitle] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase, setImageBase] = useState(null);
  const [color, setColor] = useState('#000000');
  const [titleValid, setTitleValid] = useState('');
  const [topTextValid, setTopTextValid] = useState('');
  const [bottomTextValid, setBottomTextValid] = useState('');
  const [bodyValid, setBodyValid] = useState('');
  // const [colorValid, setColorValid] = useState(true);
  const loadInitInfo = async () => {
    initInfo = await dispatch(postInitInfoData(auth.authState.token));
  }
  useEffect(() => {
    loadInitInfo();
    console.log('loadInitInfo()')
  });

  // validate title
  useEffect(() => {
    if(title.length > 30) {
      setTitleValid('Title must be betwen 1 and 30 characters in length.');
    } else {
      setTitleValid('');
    }
  }, [title]);
  // validate topText
  useEffect(() => {
    if(topText.length > 20) {
      setTopTextValid('Top text must be betwen 1 and 20 characters in length.');
    } else {
      setTopTextValid('');
    }
  }, [topText]);
  // validate bottomText
  useEffect(() => {
    if(bottomText.length > 20) {
      setBottomTextValid('Bottom text must be betwen 1 and 20 characters in length.');
    } else {
      setBottomTextValid('');
    }
  }, [bottomText]);

  const setImageText = async () => {
    let newImage = await FillTextImage({imageBase, topText, bottomText, color});
    if(newImage) {
      setImage(newImage);
    }
    
  }
  // add text to image
  useEffect(() => {
    if(imageBase && (topText.length || bottomText.length)) {
      setImageText();
    }    
    // eslint-disable-next-line
  }, [topText, bottomText, color, imageBase])
  // validate body
  useEffect(() => {
    if([...body].filter(e => e!==' ').length > 120) {
      setBodyValid('Body text must be betwen 1 and 120 characters in length.');
    } else {
      setBodyValid('');
    }
  }, [body]);

  const handleSubmit = e => {   
    e.preventDefault();
    
    const photo_id = uuid();
    const { bucket_base, upload_base } = initInfo.payload;
    
    // put photo in AWS S3 bucket with lambda function
    putNewPhoto(image, photo_id, upload_base);

    const photo_url = `${bucket_base}/${photo_id}`;
    const payload = {
      parent_id: null,
      title,
      topText,
      bottomText,
      body,
      photo_id,
      photo_url,
      username: auth.authState.userInfo.username,
      _token: auth.authState.token
    }
    // commit post details to database
    dispatch(addNewPost(payload));    
  }
  
  const handleUploadImage = (data) => {
    setImage(data);
    setImageBase(data);
  }

  return (
    <div className={classes.root}> 
      <form className={classes.form} >   

        <TextField 
          className={classes.formItem}
          label='Title (optional)' 
          variant='outlined' 
          value={title}
          // inputRef={input => !title.length && input && input.focus()}
          error={titleValid.length ? true : false}
          helperText={titleValid.length ? titleValid : ''}
          onChange={e => setTitle(e.target.value)} />
        <div className={classes.control}>
          {/* <NewPhotoForm handleUploadImage={handleUploadImage} /> */}
          {/* <UploadPhoto token={auth.authState.token} setUrl={setUrl}/> */}
          <UploadImage handleUploadImage={handleUploadImage} width={400} height={400} />
          <div className={classes.imagePreview} >
            <img src={image} alt='text on lmage'/>
          </div>
          
          <div className={classes.formItem}>
            Text Color&nbsp;  
            <input                         
              type='color' 
              onChange={e => setColor(e.target.value)}
              defaultValue={color} />
          </div>          
          <TextField 
            className={classes.formItem}
            label='Top Text (optional)' 
            variant='outlined' 
            value={topText}
            error={topTextValid.length ? true : false}
            helperText={topTextValid.length ? topTextValid : ''}
            onChange={e => setTopText(e.target.value)} />
          <TextField 
            className={classes.formItem}
            label='Bottom Text (optional)' 
            variant='outlined' 
            value={bottomText}
            error={bottomTextValid.length ? true : false}
            helperText={bottomTextValid.length ? bottomTextValid : ''}
            onChange={e => setBottomText(e.target.value)} />            
          <TextField 
            className={classes.formItem}
            multiline={true}
            rows='4'
            label='Body (optional)' 
            variant='outlined' 
            value={body}
            error={bodyValid.length ? true : false}
            helperText={bodyValid.length ? bodyValid : ''}
            onChange={e => setBody(e.target.value)} />            
        </div>        
        <div className={classes.buttons}>
          <Button 
            className={classes.formItem} 
            variant='contained' 
            color='primary' 
            onClick={handleSubmit} >
            Save
          </Button>
          <Button 
            className={classes.formItem} 
            onClick={() => history.push('/')} 
            variant='contained' 
            color='default' >
            Cancel
          </Button>
        </div>      
      </form>
      
    </div>
  );
}

export default NewPostForm;