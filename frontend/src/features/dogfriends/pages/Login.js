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
import { 
  checkUsernameSlice,
  signUpSlice, 
  loginSlice, 
  getUserInfoSlice 
} from '../dogfriendsUserSlice';

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
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [loginType, setValue] = useState("login");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  console.log('Login auth',auth)

  const handleLogin = async ({
    username,
    password
  }) => {
    try {
      // verify username and password are correct
      // const resp = await login(username.value, password.value);
      const resp = await dispatch(loginSlice({
        username: username,
        password: password
      }));
      console.log('LoginForm handleSubmitForm resp',resp)
      // if logged in, use resp.token to get user information
      const userInfo = await dispatch(getUserInfoSlice({
        token: resp.payload.token, 
        username: username
      }));

      // console.log('LoginForm handleSubmitLogin userInfo',userInfo)

      auth.setAuthState({
        userInfo: userInfo.payload.user,
        token: resp.payload.token,
      });
      // history.push(`/`);
      return false;
    } catch (error) {
      // setErrorMessage(true);
      console.log(error)
      return false;
    }
  }

  // check if username is available
  const handleCheckUsernameAvailability = async ({username}) => {
    // console.log('Login handlePreSignup username',username)
    if(username.length) {
      return await dispatch(checkUsernameSlice({username}));
    }    
  }

  
  const handleSignup = async ({
    username,
    password
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
      
      { loginType === 'login' ? 
        <LoginForm handleLogin={handleLogin}/> : 
        <SignupForm 
          handlePreSignup={handleCheckUsernameAvailability}
          handleSubmit={handleSignup} 
        /> 
      }
    </div>
  );
}


