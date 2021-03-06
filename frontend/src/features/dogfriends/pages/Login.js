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
import { addUserInfo } from '../dogfriendsUserSlice';
import {
  getUserInfo, 
  login, 
  preSignupUsernameCheck,
  signup} from '../api/DogfriendsApi';


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

  /**
   * Toggle between Login and Signup functionality
   * value is the Tab value string
   * @param {event} e 
   * @param {value} newValue 
   */
  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  /**
   * Login user
   * @param {username, password} data 
   */
  const handleLogin = async (data) => {
    try {
      // login to database
      const response = await login(data);
      // if logged in get user information
      if(response && response.status === 200) {
        data['token'] = response.data.token;
        const userInfo = await getUserInfo(data);
        await dispatch(addUserInfo(userInfo.data.user));
        auth.setAuthState({
          userInfo: {username: data.username},
          token: data.token,
        });
        return true;
      } else {
        console.log('Error login',response)
        return false;
      }        
    } catch (error) {
      console.error(error)
      return false;
    }
  }
  
  /**
   * Check if username is available
   * @param {username} data 
   */
  const handleCheckUsernameAvailability = async (data) => {
    if(data.username.length) {
      return await preSignupUsernameCheck(data);
    }    
  }
  
  /**
   * Signup user
   * @param {
   *  username, (required)
   *  password, (required)
   *  first_name, (required)
   *  last_name, (required)
   *  email, (required)
   *  city, (optional)
   *  state, (optional)
   *  country (optional)
   * } data 
   */
  const handleSignup = async (data) => {  
    const resp = await signup(data);
    if(resp.status === 201) {
      auth.setAuthState({
        userInfo: {username: data.username},
        token: resp.data.token,
      });
      history.push('/');
    } else {
      return false;
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


