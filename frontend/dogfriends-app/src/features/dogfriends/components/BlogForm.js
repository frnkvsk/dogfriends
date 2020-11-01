import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  FormHelperText, 
  OutlinedInput, 
  TextField,
  Modal,
} from '@material-ui/core';
import { 
  addNewPost,
  editPost,
 } from '../dogfriendsPostsSlice';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '30px 0 20px 0',
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginRight: '5px',
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BlogForm = ({data}) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const rootRef = React.useRef(null);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(auth.authState.token);
  }, [auth]);
   

  useEffect(() => {
    const {id, title, description, body} = data;
    if(id !== undefined) setId(id);
    if(title !== undefined) setTitle(title);
    if(description !== undefined) setDescription(description);
    if(body !== undefined) setBody(body);
  }, [data]);

  const handleSubmit = e => {   
    e.preventDefault();
    if(title.length && description.length && body.length) {
      const payload = {
        id: id,
        title: title, 
        description: description, 
        body: body,
        username: auth.authState.userInfo.username,
        token: token
      }
      if(id !== '') {
        dispatch(editPost(payload));
      } else {
        dispatch(addNewPost(payload));
      }      
      history.push('/');
    } 
  }
  const handleChange = e => {
    if(e.target.name === 'title') {
      if(e.target.value.length >= 30) {
        toggleOpen();
      } else {
        setTitle(e.target.value);
      }            
    } else if(e.target.name === 'description') {
      if(e.target.value.length >= 50) {
        toggleOpen();
      } else {
        setDescription(e.target.value);   
      }
         
    } else {
      if(e.target.value.length >= 350) {
        toggleOpen();
      } else {
        setBody(e.target.value);      
      }       
    }
  }
  
  const toggleOpen = () => setOpen(!open);

  return (
    <>    
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
        >
        <div className={classes.paper}>
          <h2 id="server-modal-title">Over Character Limit!</h2>
          <p id="server-modal-description"><div>Limit Title to 30 characters</div> 
          <div>Description to 50 characters</div> <div>Body to 350</div></p>
          <Button onClick={toggleOpen} variant="contained" color="default" >
          OK
        </Button>
        </div>
      </Modal>
      <form className={classes.form} noValidate autoComplete="off">      
        <FormHelperText className={classes.label}>Title:</FormHelperText>      
        <OutlinedInput 
          name="title"
          className={classes.input} 
          variant="outlined" 
          value={title}
          onChange={handleChange}
        />
        <FormHelperText className={classes.label}>Description:</FormHelperText>
        <OutlinedInput 
          name="description"
          className={classes.input} 
          variant="outlined" 
          value={description}
          onChange={handleChange}
        />
        <FormHelperText className={classes.label}>Body:</FormHelperText>
        <TextField
          name="body"
          className={classes.input} 
          variant="outlined" 
          multiline
          rows={3}
          value={body}
          onChange={handleChange}
        />
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={handleSubmit} >
            Save
          </Button>
          <Button onClick={() => history.push('/')} variant="contained" color="default" >
            Cancel
          </Button>
        </div>      
      </form>
    </>
  );
}

export default BlogForm;