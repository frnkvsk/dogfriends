/** Login and Signup */
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, FormHelperText, Box, Button } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useHistory } from "react-router-dom";
import { login, signup, getUserInfo } from '../api/DogfriendsApi';
import { useFormInput } from '../hooks/useFormInput';
import { AuthContext } from '../context/AuthContext';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
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
  err: {
    color: '#ff1744',
    fontSize: '24px',
  }

}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [loginType, setValue] = useState("login");
  const [errorMessage, setErrorMessage] = useState(false);  
  const username = useFormInput("");
  const password = useFormInput("");
  const first_name = useFormInput("");
  const last_name = useFormInput("");  
  const photo_url = useFormInput("");
  const email = useFormInput("");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const handleSubmitLogin = async () => {
    setErrorMessage(false);

    try {
      // verify username and password are correct
      const resp = await login(username.value, password.value);
      
      // if logged in, use resp.token to get user information
      const userInfo = await getUserInfo(resp.data.token, username.value);

      auth.setAuthState({
        userInfo: userInfo.data.user,
        token: resp.data.token,
      });
      history.push(`/`);
    } catch (error) {
      setErrorMessage(true);
    }    
  }
  const handleSubmitSignup = async () => {
    setErrorMessage(false);
    try {
      const resp = await signup(
          username.value, 
          password.value, 
          first_name.value, 
          last_name.value, 
          photo_url.value, 
          email.value);
      auth.setAuthState({
        token: resp.data.token,
        userInfo: {
          username: username.value,
          first_name: first_name.value,
          last_name: last_name.value,
          photo_url: photo_url.value,
          email: email.value,
        }
      });
      history.push(`/`);
    } catch (error) {
      setErrorMessage(true);
    }    
  }

  return (
    
    <Container className={classes.root}>
      <Box className={classes.err} 
        component="span" 
        display={errorMessage ? 'block' : 'none'}
        >
          Error: Invalid credentials
      </Box>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={loginType}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Login" value="login" />
          <LinkTab label="Sign up" value="signup" />
        </Tabs>
      </AppBar>
      
      {loginType === 'login' ?    
        <form className={classes.form}>
          <FormHelperText className={classes.label} >Username</FormHelperText>
          <OutlinedInput className={classes.input} id="username" name="username" type="text" variant="outlined" {...username}/>

          <FormHelperText className={classes.label} >Password</FormHelperText>
          <OutlinedInput className={classes.input} id="password" name="password" type="password" variant="outlined" {...password} />
          <div className={classes.button}>
            <Button variant="contained" color="primary" onClick={handleSubmitLogin}>Submit</Button>
          </div>
        </form>
                :
        <form className={classes.form}>      
          <FormHelperText className={classes.label} >username</FormHelperText>
          <OutlinedInput className={classes.input} name="username" variant="outlined" {...username}/>

          <FormHelperText className={classes.label} >Password</FormHelperText>
          <OutlinedInput className={classes.input} name="password" type="password" variant="outlined" {...password}/>

          <FormHelperText className={classes.label} >First Name</FormHelperText>
          <OutlinedInput className={classes.input} name="first_name" variant="outlined" {...first_name}/>

          <FormHelperText className={classes.label} >Last Name</FormHelperText>
          <OutlinedInput className={classes.input} name="last_name" variant="outlined" {...last_name}/>

          <FormHelperText className={classes.label} >Photo URL</FormHelperText>
          <OutlinedInput className={classes.input} name="photo_url" variant="outlined" {...photo_url}/>

          <FormHelperText className={classes.label} >Email</FormHelperText>
          <OutlinedInput className={classes.input} name="email" variant="outlined" {...email}/>
          <div className={classes.button}>
            <Button variant="contained" color="primary" onClick={handleSubmitSignup}>Submit</Button>
          </div>
          
        </form>
      }
    </Container>
  );
}


