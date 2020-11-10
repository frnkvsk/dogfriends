/** Login and Signup */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { Container, FormHelperText, Box, Button } from '@material-ui/core';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import { useHistory } from "react-router-dom";
// import { login, signup, getUserInfo } from '../api/DogfriendsApi';
// import { useFormInput } from '../hooks/useFormInput';
// import { AuthContext } from '../context/AuthContext';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

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
    minHeight: '100vh',
    maxWidth: '500px',
    paddingTop: '30px',
    height: '100vh',
    // border: '1px solid red'
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

  // const handleSubmitLogin = async () => {
  //   setErrorMessage(false);

  //   try {
  //     // verify username and password are correct
  //     const resp = await login(username.value, password.value);
      
  //     // if logged in, use resp.token to get user information
  //     const userInfo = await getUserInfo(resp.data.token, username.value);

  //     auth.setAuthState({
  //       userInfo: userInfo.data.user,
  //       token: resp.data.token,
  //     });
  //     history.push(`/`);
  //   } catch (error) {
  //     setErrorMessage(true);
  //   }    
  // }
  

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
      
      { loginType === 'login' ? <LoginForm /> : <SignupForm /> }
    </div>
  );
}


