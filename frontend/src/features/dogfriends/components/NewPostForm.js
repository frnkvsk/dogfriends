import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  TextField,
  // Checkbox,
  // FormControlLabel,
  // Box,
} from '@material-ui/core';
import { 
  addNewPost,
 } from '../dogfriendsPostsSlice';
// import { useFormInput } from '../hooks/useFormInput';
import { AuthContext } from '../context/AuthContext';
// import FormInputOutlined from './FormInputOutlined';
// import PostPhoto from './PostPhoto';
// import NewPhotoForm from './NewPhotoForm';
// import UploadPhoto from './UploadPhoto';
import {UploadImage} from './UploadImage';

import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    border: '1px solid red',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '30px 0 20px 0',
  },
  buttons: {

  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginRight: '5px',
  },
  memeInput: {
    // display: formInputState,
  },
  imagePreview: {
    width: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  image: {
    width: '400px',
    height: '400px',
    borderRadius: '10px',
    padding: '10px',
  }
}));

const NewPostForm = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log('NewPostForm auth',auth)
  const [title, setTitle] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  // const [body, setBody] = useState('');
  // const [color, setColor] = useState('');
  const [titleValid, setTitleValid] = useState('');
  const [topTextValid, setTopTextValid] = useState('');
  const [bottomTextValid, setBottomTextValid] = useState('');
  // const [bodyValid, setBodyValid] = useState('');
  // const [colorValid, setColorValid] = useState(true);

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
    if(topText.length > 30) {
      setTopTextValid('Top text must be betwen 1 and 30 characters in length.');
    } else {
      setTopTextValid('');
    }
  }, [topText]);
  // validate bottomText
  useEffect(() => {
    if(bottomText.length > 30) {
      setBottomTextValid('Bottom text must be betwen 1 and 30 characters in length.');
    } else {
      setBottomTextValid('');
    }
  }, [bottomText]);
  // validate body
  // useEffect(() => {
  //   if([...body].filter(e => e!==' ').length > 200) {
  //     setBodyValid('Body text must be betwen 1 and 200 characters in length.');
  //   } else {
  //     setBodyValid('');
  //   }
  // }, [body]);

  const handleSubmit = e => {   
    e.preventDefault();
    // if(title.length && description.length && body.length) {
    //   const payload = {
    //     id: 'id',
    //     title: title, 
    //     description: 'description', 
    //     body: body,
    //     username: auth.authState.userInfo.username,
    //     token: auth.authState.token
    //   }
    //   dispatch(addNewPost(payload));    
    //   history.push('/');
    // } 
    const payload = {
      parent_id: uuid(),
      photo_id: uuid(),
      title: title, 
      // description: 'description', 
      // body: uuid(),
      // username: auth.authState.userInfo.username,
      token: auth.authState.token
    }
    dispatch(addNewPost(payload));    
  }
  
  // const title = useFormInput('');  
  // const top = useFormInput('');
  // const bottom = useFormInput('');
  // const body = useFormInput('');

  // const [url, setUrl] = useState('');
  // const [formInputState, setFormInputState] = useState('inline');
  // const [photoShowState, setPhotoShowState] = useState('none');
  // const [photo, setPhoto] = useState({
  //   url: '',
  //   topText: '',
  //   bottom: '',
  //   textColor: '#000000'
  // });
  const [textColor, setTextColor] = useState('#000000');  
  const handleTextColor = (e) => {
    e.preventDefault();
    setTextColor(e.target.value);
  }
  // useEffect(() => {
  //   // console.log('useEffect photoShowState',photoShowState)
  //   // console.log('useEffect url', url)
  //   if(url !== '') {
  //     setPhotoShowState('flex');
  //     setPhoto({
  //       url: url,
  //       top: topText,
  //       bottom: bottomText,
  //       textcolor: textColor
  //     });
  //   } else {
  //     setPhotoShowState('none');
  //     setPhoto({
  //       url: '',
  //       top: '',
  //       bottom: '',
  //       textcolor: textColor
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [url, topText.value, bottomText.value, textColor]);

  // const handleCheckBox = () => {
    // if(formInputState === 'none') setFormInputState('inline')
    // else setFormInputState('none')
  //   setFormInputState('inline')
  // }
  const handleUploadImage = (data) => {
    console.log('NewPostForm handleUploadImage data',data)
  }

  return (
    <div className={classes.root}>    
      {/* <Box className={classes.imagePreview} style={{display: photoShowState}}>
        <PostPhoto photo={photo}/>
        
      </Box> */}
      <form className={classes.form} >   

        <TextField 
          label="Title" 
          variant='outlined' 
          value={title}
          inputRef={input => !title.length && input && input.focus()}
          error={titleValid.length ? true : false}
          helperText={titleValid.length ? titleValid : ''}
          onChange={e => setTitle(e.target.value)} />
        {/* <FormControlLabel
          control={<Checkbox onChange={handleCheckBox} />}
          label="Add a photo."/> */}
        <div style={{display: 'inline'}}>
          {/* <NewPhotoForm url={url} handleSetUrl={handleSetUrl} /> */}
          {/* <UploadPhoto token={auth.authState.token} setUrl={setUrl}/> */}
          <UploadImage handleUploadImage={handleUploadImage}/>
          Text Color&nbsp;  
          <input           
            type="color" 
            onChange={handleTextColor}
            defaultValue={textColor} />
          <TextField 
            label="Top Text" 
            variant='outlined' 
            value={topText}
            error={topTextValid.length ? true : false}
            helperText={topTextValid.length ? topTextValid : ''}
            onChange={e => setTopText(e.target.value)} />
          <TextField 
            label="Bottom Text" 
            variant='outlined' 
            value={bottomText}
            error={bottomTextValid.length ? true : false}
            helperText={bottomTextValid.length ? bottomTextValid : ''}
            onChange={e => setBottomText(e.target.value)} />
            
        </div>
        {/* <TextField 
          multiline
          rows={3}
          label="Body" 
          variant='outlined' 
          value={body}
          error={bodyValid.length ? true : false}
          helperText={bodyValid.length ? bodyValid : ''}
          onChange={e => setBody(e.target.value)} /> */}
        
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" onClick={handleSubmit} >
            Save
          </Button>
          <Button onClick={() => history.push('/')} variant="contained" color="default" >
            Cancel
          </Button>
        </div>      
      </form>
    </div>
  );
}

export default NewPostForm;