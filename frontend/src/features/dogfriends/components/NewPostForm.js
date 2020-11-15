import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  FormHelperText, 
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
} from '@material-ui/core';
import { 
  addNewPost,
  editPost,
 } from '../dogfriendsPostsSlice';
import { useFormInput } from '../hooks/useFormInput';
import { AuthContext } from '../context/AuthContext';
import FormInputOutlined from './FormInputOutlined';
import PostPhoto from './PostPhoto';

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

const NewPostForm = ({data}) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const handleSubmit = e => {   
    // e.preventDefault();
    // if(title.length && description.length && body.length) {
    //   const payload = {
    //     id: id,
    //     title: title, 
    //     description: description, 
    //     body: body,
    //     username: auth.authState.userInfo.username,
    //     token: token
    //   }
    //   dispatch(addNewPost(payload));    
    //   history.push('/');
    // } 
  }
  
  const title = useFormInput('');
  const photo_url = useFormInput('');
  const top = useFormInput('');
  const bottom = useFormInput('');
  const body = useFormInput('');
  const [formInputState, setFormInputState] = useState('none');
  const [photoShowState, setPhotoShowState] = useState('none');
  const [photo, setPhoto] = useState({
    url: '',
    top: '',
    bottom: '',
    textColor: '#000000'
  });
  const [textColor, setTextColor] = useState('#000000');  
  const handleTextColor = (e) => {
    e.preventDefault();
    setTextColor(e.target.value);
  }
  useEffect(() => {
    console.log('useEffect photoShowState',photoShowState)
    if(photo_url.value !== '') {
      setPhotoShowState('flex');
      setPhoto({
        url: photo_url.value,
        top: top.value,
        bottom: bottom.value,
        textColor: textColor
      });
    } else {
      setPhotoShowState('none');
      setPhoto({
        url: '',
        top: '',
        bottom: '',
        textColor: textColor
      });
    }
  }, [photo_url.value, top.value, bottom.value, textColor]);

  const handleCheckBox = () => {
    if(formInputState === 'none') setFormInputState('inline')
    else setFormInputState('none')
  }
  return (
    <div className={classes.root}>    
      <Box className={classes.imagePreview} style={{display: photoShowState}}>
        <PostPhoto photo={photo}/>
      </Box>
      <form className={classes.form} noValidate autoComplete="off">   

        <FormInputOutlined label="Title" formInput={title} />
        <FormInputOutlined label="Photo URL" formInput={photo_url} />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckBox} />}
          label="Add text to photo."
      />
        <div style={{display: formInputState}}>
          Text Color&nbsp;  
          <input           
            type="color" 
            onChange={handleTextColor}
            defaultValue={textColor} />
          <FormInputOutlined label="Top Text" formInput={top} />
          <FormInputOutlined label="Bottom Text" formInput={bottom} />
        </div>
        
        <TextField 
          multiline
          rows={4} 
          label="Body" 
          variant="outlined" 
          formInput={body} />
        {/* <FormHelperText className={classes.label}>Body:</FormHelperText> */}
        {/* <FormControlLabel
          control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="Add text to photo"
        /> */}
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