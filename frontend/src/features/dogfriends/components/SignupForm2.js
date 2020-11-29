import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '100vh',
    maxWidth: '700px',
    padding: '2px',
    height: '100vh',
    border: '1px solid red',
  },  
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '50px',
    margin: '20px 0 20px 0',
    // border: '1px solid orange',
    '& p': {
      fontSize: '38px',
      color: 'green',
      // border: '1px solid pink',
    },
    '& button': {
      height: '30px',
    }
  }

}));


const SignupForm = ({title, handleSubmit}) => {
  const classes = useStyles();
  // const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const history = useHistory();  
  
  const handleClick = () => {
    if(username.length > 3 && first_name.length > 3 && last_name.length > 3 && password.length > 6 && email.length > 8) {
      handleSubmit({
        username,
        first_name,
        last_name, 
        password,
        email,
        city, 
        state, 
        country, 
      });
    }
    
  }
  // const handleOpenModel = () => {
  //   setShowModel('inline');
  // }
  // console.log('UserInfoForm photo_details',photo_details)
  return (
    <div className={classes.root}>
      
      <div className={classes.header}>
        <p>{title}</p>
        <Button className={classes.button} variant="contained" onClick={() => history.push('/')}>
          Cancel
        </Button> 
        <Button className={classes.button} variant="contained" onClick={handleClick}>
          Done
        </Button>
      </div>
      
      <div className={classes.form}>
        
        <TextField 
          className={classes.formElement} 
          label='Username: (required)' 
          variant='outlined' 
          value={username} 
          onChange={e => setUsername(e.target.value)}/>
        <TextField 
          className={classes.formElement} 
          label='First Name: (required)' 
          variant='outlined' 
          value={first_name} 
          onChange={e => setFirstName(e.target.value)}/>
        <TextField 
          className={classes.formElement} 
          label='Last Name: (required)' 
          variant='outlined' 
          value={last_name} 
          onChange={e => setLastName(e.target.value)}/>
        <TextField 
          className={classes.formElement} 
          label='Password: (required)' 
          type='password'
          variant='outlined' 
          value={password} 
          onChange={e => setPassword(e.target.value)}/>
        <TextField 
          className={classes.formElement} 
          label='Email: (required)' 
          variant='outlined' 
          value={email} 
          onChange={e => setEmail(e.target.value)}/>
        <TextField 
          className={classes.formElement} 
          label='City: (optional)' 
          variant='outlined' 
          value={city} 
          onChange={e => setCity(e.target.value)}/>
        <TextField 
          className={classes.formElement} 
          label='State: (optional)' 
          variant='outlined' 
          value={state} 
          onChange={e => setState(e.target.value)}/>
        <TextField 
          className={classes.formElement} 
          label='Country: (optional)' 
          variant='outlined' 
          value={country} 
          onChange={e => setCountry(e.target.value)}/>
      
      </div>
    </div>
  );
}
export default SignupForm;