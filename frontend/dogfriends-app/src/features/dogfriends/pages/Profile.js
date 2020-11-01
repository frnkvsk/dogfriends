import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, FormHelperText, } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button, Box } from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';
import { useFormInput } from '../hooks/useFormInput';
import { patchUserInfo } from '../api/DogfriendsApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px',
    padding: '30px',
    height: '100vh',
  },
  form: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    width: '90%',
    margin: '10px 20px 0 20px',
  },
  input: {
    width: '90%',
    margin: '0 20px 0 20px',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 20px 15px',
  },
  success: {
    color: '#4caf50',
    fontSize: '24px',
  },
  err: {
    color: '#ff1744',
    fontSize: '24px',
  }

}));

export default function Profile() {
  const auth = useContext(AuthContext);
  const user = auth.authState.userInfo;
  const classes = useStyles();
  const username = useFormInput(user.username);
  const password = useFormInput("");
  const first_name = useFormInput(user.first_name);
  const last_name = useFormInput(user.last_name);
  const email = useFormInput(user.email);
  const photo_url = useFormInput(user.photo_url);  
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleClick = async () => {
    try {
      const userInfo = {
        username: username.value,
        first_name: first_name.value,
        last_name: last_name.value,        
        email: email.value,
        photo_url: photo_url.value || first_name.value,
      }
      console.log('userInfo',userInfo)
      // set context state and save it to localstorage
      auth.setAuthState({
        token: auth.authState.token,
        userInfo: userInfo,
      });
      // persist data to the database
      userInfo.password = password.value;
      if(Object.values(userInfo).every(e => e.length)) {
        await patchUserInfo(auth.authState.token, userInfo);
        setErrorMessage(false);
        setSuccessMessage(true);
      } else {
        setSuccessMessage(false);
        setErrorMessage(true);
      }
      
    } catch (error) {
      console.error('Profile err',error);
    }
    
  }

  return (
    
    <Container className={classes.root}>
      <h1>Profile</h1>  
      <Box className={classes.success} 
        component="span" 
        display={successMessage ? 'block' : 'none'}
        >
          Success: Profile updated
      </Box>    
      <Box className={classes.err} 
        component="span" 
        display={errorMessage ? 'block' : 'none'}
        >
          Error: Inputs incomplete
      </Box>    
      <form className={classes.form}>      
        <FormHelperText className={classes.label} >Username</FormHelperText>
        <FormHelperText className={classes.label}>{username.value}</FormHelperText>

        <FormHelperText className={classes.label}>Confirm Password</FormHelperText>
        <OutlinedInput required={true} className={classes.input} name="password" type="password" variant="outlined" {...password} />

        <FormHelperText className={classes.label}>First Name</FormHelperText>
        <OutlinedInput className={classes.input} name="first_name" variant="outlined" {...first_name}/>

        <FormHelperText className={classes.label}>Last Name</FormHelperText>
        <OutlinedInput className={classes.input} name="last_name" variant="outlined" {...last_name}/>

        <FormHelperText className={classes.label}>Email</FormHelperText>
        <OutlinedInput className={classes.input} name="email" variant="outlined" {...email}/>

        <FormHelperText className={classes.label}>Photo URL</FormHelperText>
        <OutlinedInput className={classes.input} name="photo_url" variant="outlined" {...photo_url}/>
        <div className={classes.button}>
          <Button onClick={handleClick} variant="contained" color="primary">Update Profile</Button>
        </div>          
      </form>
      
    </Container>
  );
}