/** Login and Signup */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  TextField, 
   } from '@material-ui/core';

// import { useFormInput } from '../hooks/useFormInput';
// import { AuthContext } from '../context/AuthContext';
// import FormInputOutlined from './FormInputOutlined';
// import { loginSlice, getUserInfoSlice } from '../dogfriendsUserSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '700px', 
    paddingTop: '20px',
    
  },
  formElement: {
    width: '95%',
    marginTop: '20px',
    marginBottom: '20px',
  },
  button: {
    display: 'flex',
    width: '100%',
    margin: '10px',
    marginLeft: '40px',
  },
  err: {
    color: '#ff1744',
    fontSize: '24px',
  },  
  completed: {
    display: 'inline-block',
  },

}));


export default function LoginForm({handleLogin}) {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const auth = useContext(AuthContext);
  // const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(false);
  
  useEffect(() => {
    setErrorMessage(false);
  }, [username, password])

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log('LoginForm handleSubmitForm ',username,password)
    const valid = handleLogin({username, password});
    setErrorMessage(valid);
    if(valid) history.push('/'); 
  }
  
  return (
    <form className={classes.root} onSubmit={handleSubmitLogin}>
      {/* {console.log(errorMessage)} */}
       <Box className={classes.err} 
        component="span" 
        display={errorMessage ? 'block' : 'none'}
        >
          Error: Invalid credentials
      </Box>
      <TextField 
        className={classes.formElement} 
        label='Username: (required)' 
        variant='outlined' 
        value={username} 
        onChange={e => setUsername(e.target.value)}/>
      <TextField 
        className={classes.formElement} 
        type='password'
        label='Password: (required)' 
        variant='outlined' 
        value={password} 
        onChange={e => setPassword(e.target.value)}/>
      <div className={classes.button}>
        <Button type="submit" variant="contained" color="primary" >Submit</Button>
      </div>
    </form>
  );
}
