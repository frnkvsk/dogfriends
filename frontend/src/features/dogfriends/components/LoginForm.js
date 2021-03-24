import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  FormHelperText,
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
    textAlign: 'center',
  },
}));


export default function LoginForm({handleLogin}) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorState, setErrorState] = useState(false);

  const handleSubmitLogin = async (e) => {    
    e.preventDefault();    
    let loginError = await handleLogin({username, password});
    setErrorState(loginError);
  }
  
  return (
    <form className={classes.root} onSubmit={handleSubmitLogin}>
      {errorState ? (
        <FormHelperText 
          className={classes.err} 
          >
            Error: Invalid Login Credentials
        </FormHelperText> 
      ) : ''}           
      <TextField   
        inputProps={{
          'data-testid': 'username'
        }}    
        className={classes.formElement} 
        label='Username: (required)' 
        variant='outlined' 
        value={username} 
        autoFocus={true}
        onChange={e => setUsername(e.target.value)}/>
      <TextField   
        inputProps={{
          'data-testid': 'password'
        }}    
        id='password'
        className={classes.formElement} 
        type='password'
        label='Password: (required)' 
        variant='outlined' 
        value={password} 
        onChange={e => setPassword(e.target.value)}/>
      <Button 
        className={classes.formElement} 
        type='submit' 
        variant='contained' 
        color='primary' >
          Submit
      </Button>
    </form>
  );
}
