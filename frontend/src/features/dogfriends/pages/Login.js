/** Login and Signup */
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { Container, FormHelperText, Box, Button } from '@material-ui/core';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import { useHistory } from "react-router-dom";
// import { login, signup, getUserInfo } from '../api/DogfriendsApi';
// import { useFormInput } from '../hooks/useFormInput';
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { signUpSlice } from '../dogfriendsUserSlice';

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
    width: '100%',
    maxWidth: '500px',
    paddingTop: '30px',
    maxHeight: '90vh',   
    overflow: 'hidden'
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
  // const history = useHistory();
  // const auth = useContext(AuthContext);
  const [loginType, setValue] = useState("login");
  // const [errorMessage, setErrorMessage] = useState(false);  
  // const username = useFormInput("");
  // const password = useFormInput("");
  // const first_name = useFormInput("");
  // const last_name = useFormInput("");  
  // const photo_url = useFormInput("");
  // const email = useFormInput("");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  console.log('SignupForm auth',auth)
  const handleSubmit = async ({
    username,
    password,
    first_name,
    last_name, 
    email, 
    photo_id,
    city, 
    state, 
    country 
    }) => {
    const userInfo = {
      username,
      password,
      first_name,
      last_name, 
      email, 
      photo_id,
      city, 
      state, 
      country 
    }
    userInfo._token = auth.authState.token;
    // userInfo.username = auth.authState.userInfo.username;
    console.log('SignupForm userInfo',userInfo)
    return await dispatch(signUpSlice(userInfo));
  }
  

  return (
    
    <div className={classes.root}>
      {/* <Box className={classes.err} 
        component="span" 
        display={errorMessage ? 'block' : 'none'}
        >
          Error: Invalid credentials
      </Box> */}
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
      
      { loginType === 'login' ? <LoginForm /> : <SignupForm handleSubmit={handleSubmit} /> }
    </div>
  );
}


