import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  FormHelperText, 
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { 
  addNewPost,
  editPost,
 } from '../dogfriendsPostsSlice';
 import { useFormInput } from '../hooks/useFormInput';
 import { AuthContext } from '../context/AuthContext';
 import FormInputOutlined from './FormInputOutlined';

let visibleFormInput = 'none';
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
  // paper: {
  //   width: 400,
  //   backgroundColor: theme.palette.background.paper,
  //   border: '2px solid #000',
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing(2, 4, 3),
  // },
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

  const handleCheckBox = () => {
    if(formInputState === 'none') setFormInputState('inline')
    else setFormInputState('none')
  }
  return (
    <div className={classes.root}>    
      
      <form className={classes.form} noValidate autoComplete="off">   

        <FormInputOutlined label="Title" formInput={title} />
        <FormInputOutlined label="Photo URL" formInput={photo_url} />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckBox} />}
          label="Add text to photo."
      />
        <div style={{display: formInputState}}>
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