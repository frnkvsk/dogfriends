import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  TextField, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: '20px',    
  },
  formElement: {
    width: '95%',
    margin: '10px',
  },
  err: {
    color: '#ff1744',
    fontSize: '24px',
  },
}));


export default function LoginForm({handleLogin}) {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(true);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const valid = await handleLogin({username, password});
    setErrorMessage(valid);
    if(valid) history.push('/'); 
  }
  
  return (
    <form className={classes.root} onSubmit={handleSubmitLogin}>
      <Box className={classes.err} 
        component="span" 
        display={!errorMessage ? 'block' : 'none'}
        >
          Error: Invalid Login Credentials
      </Box>
      <TextField 
        className={classes.formElement} 
        label='Username: (required)' 
        variant='outlined' 
        value={username} 
        autoFocus={true}
        onChange={e => setUsername(e.target.value)}/>
      <TextField 
        className={classes.formElement} 
        type='password'
        label='Password: (required)' 
        variant='outlined' 
        value={password} 
        onChange={e => setPassword(e.target.value)}/>
      <Button 
        className={classes.formElement} 
        type="submit" 
        variant="contained" 
        color="primary" >
          Submit
      </Button>
    </form>
  );
}
