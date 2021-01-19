/** Login and Signup */
import React, { useState, useContext } from 'react';
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '500px',
    paddingTop: '30px',
    paddingBottom: '100px',
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
  },

}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [loginType, setValue] = useState('login');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const handleLogin = async ({
    username,
    password
  }) => {
    try {
      // verify username and password are correct
      const resp = await dispatch(loginSlice({
        username: username,
        password: password
      }));
      console.log('LoginForm handleSubmitForm resp',resp)
      // if logged in, use resp.token to get user information
      if(resp && resp.payload.token.length) {
        console.log('if resp && resp.token.length',resp , resp.payload.token.length)
        const userInfo = await dispatch(getUserInfoSlice({
          token: resp.payload.token, 
          username: username
        }));
  
        auth.setAuthState({
          userInfo: userInfo.payload.user,
          token: resp.payload.token,
        });
        return true;
      } else {
        console.log('else resp && resp.token.length',resp , resp.payload.token.length)
        return false;
      }      
      
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  // check if username is available
  const handleCheckUsernameAvailability = async ({username}) => {
    if(username.length) {
      return await dispatch(checkUsernameSlice({username}));
    }    
  }
  
  const handleSignup = async ({
    username,
    password, 
    first_name,
    last_name,
    email
    }) => {
    const userInfo = {
      username,
      password,
      first_name,
      last_name, 
      email,
    }
    
    console.log('SignupForm userInfo',userInfo)
    const resp = await dispatch(signUpSlice(userInfo));
    console.log('Login handleSignup resp',resp)
    if(resp.payload.token) {
      auth.setAuthState({
        userInfo: userInfo,
        token: resp.payload.token,
      });
      history.push('/');
    }    
  }  

  return (    
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          variant='fullWidth'
          value={loginType}
          onChange={handleChange}
          aria-label='nav tabs example'
          TabIndicatorProps={
            { 
              style: {
                backgroundColor: 'secondary', 
                height: '5px',
              },
            }
          }   
        >
          <Tab label='Login' value='login' />
          <Tab label='Sign up' value='signup' />
        </Tabs>
      </AppBar>
      
      { loginType === 'login' ? 
        <LoginForm handleLogin={handleLogin}/> : 
        <SignupForm 
          handlePreSignup={handleCheckUsernameAvailability}
          handleSignup={handleSignup} 
        /> 
      }
    </div>
  );
}


