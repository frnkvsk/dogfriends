import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Zoom, makeStyles } from '@material-ui/core';
import { 
  Button, 
  TextField,
} from '@material-ui/core';
import { 
  addPosts,
 } from '../dogfriendsPostsSlice';
import { AuthContext } from '../context/AuthContext';
import {UploadImage} from './UploadImage';
import { FillTextImage } from './FillTextImage';
import { putNewPhoto } from '../api/DogfriendsApi';
import { postPostNew } from '../api/DogfriendsApi';
import { selectInitInfo } from '../dogfriendsInitInfoSlice';
import { selectPosts } from '../dogfriendsPostsSlice';
import { addPhotoUrl } from '../dogfriendsPhotosSlice';

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
    margin: '0 0 20px 0',
    padding: '15px',
    backgroundColor: theme.palette.common.yellowLight,
    border: '1px solid #eeeeee', 
    borderRadius: 6,   
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
  },  
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    ...theme.typography.button,
    borderRadius: '22px', 
    height: '45px',
  }

}));

const PostFormNew = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);  
  const selectInitInfoData = useSelector(selectInitInfo);
  const selectPostData = useSelector(selectPosts);
  const dispatch = useDispatch();
  const history = useHistory();
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
 
  
  const handleSubmit = async e => {   
    e.preventDefault();
    if(image) {
      const photo_id = 'lg-' + uuid() + '.txt';
      const aws_endpoint_up = selectInitInfoData.data.aws_bucket_endpoint_up;
      // put photo in AWS S3 bucket with lambda function
      // post photo to db photos table
      putNewPhoto(image, photo_id, aws_endpoint_up, auth.authState.token);
      let photoUrl = {
        photo_id,
        imageUrl: image
      }
      dispatch(addPhotoUrl(photoUrl)); 
      const payload = {
        id: uuid(),
        title,
        body,
        photo_id,
        votes: 0,
        replies: 0,
        username: auth.authState.userInfo.username,
        _token: auth.authState.token
      }
      
      dispatch(addPosts([payload, ...selectPostData.data])); 
      // commit post details to database
      postPostNew(payload);       
      history.push('/');
    }
      
  }
  
  const handleUploadImage = async (canvas, imageUrl) => {
    setImage(imageUrl);
    setImageBase(imageUrl);
  }

  return (
    <Zoom in={true} style={{ transitionDelay: '1ms' }}> 
    <div className={classes.root}> 
      <form method='post' className={classes.form} id='imageUploadForm'> 
        <TextField 
          className={classes.formItem}
          label='Title (optional)' 
          variant='outlined' 
          value={title}
          error={titleValid.length ? true : false}
          helperText={titleValid.length ? titleValid : ''}
          onChange={e => setTitle(e.target.value)} />
        <div className={classes.control}>
          <UploadImage handleUploadImage={handleUploadImage} width={400} height={400} />
          <div className={classes.imagePreview} >
            <img id='uploadIMG' name='uploadImage' src={image} alt=''/>
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
            className={classes.button} 
            variant='contained' 
            color='primary' 
            onClick={handleSubmit} 
            >
            Save
          </Button>
          <Button 
            className={classes.button} 
            onClick={() => history.push('/')} 
            variant='contained' 
            color='secondary' >
            Cancel
          </Button>
        </div>      
      </form>
      
    </div>
    </Zoom>
  );
}

export default PostFormNew;