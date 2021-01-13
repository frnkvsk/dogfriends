import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button, TextField } from '@material-ui/core';
import UploadPhoto from './UploadPhoto';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // border: '2px solid blue',
  },
  button: {
    // margin: '10px',
  },
  formElement: {
    width: '95%',
    margin: '10px'
  },
}));

function getSteps() {
  return [
    'Create a username and password (required)', 
    'Enter your contact info (required)', 
    'Further define your account (optional)', 
    'Review and confirm account creation'
  ];
}

// const focusUsernameInputField = input => {
//   if (input) {
//     setTimeout(() => {input.focus()}, 100);
//   }
// };

export default function SignupForm({ handlePreSignup, handleSignup }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const token = auth.authState.token;
  // console.log('SignupForm token',token)
  // Step 1 (required) make sure username and password are valid
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState('');

  // Step 2 (required) make sure email is valid and complete registration process
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');  
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState('');
  
  // Step 3 (optional) allow the option for new user to further define their account 
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const [photo_details, setPhotoDetails] = useState({
    photo_id: null,
    photo_url: null
  });
  
  // verify username is not already in use and is in valid form
  useEffect(() => {
    const checkUsername = async () => {
      if(username.length) {
        const res = await handlePreSignup({username});
        if(res.payload && res.payload.resp) 
          setUsernameValid('Username is already taken.');
      }      
    }
    const validateUsername = (username) => {
      const expression = /^\s*[a-zA-Z]\s*(?:\S[\t ]*){2,30}/;    
      return expression.test(username);
    }
    if(username.length && !validateUsername(username)) {
      setUsernameValid('Username must be between 3-30 characters and start with a letter [a-zA-Z].');
    } else {
      setUsernameValid('');
      checkUsername();
    }
  }, [username, handlePreSignup]);

  // validate password strength
  useEffect(() => {  
    const validatePassword = (username) => {
      return password.length && (
        password.length < 8 || 
        !/[a-z]/.test(password) || 
        !/[A-Z]/.test(password) || 
        !/[\d]/.test(password)
      );
    }
    if(validatePassword(password)) {
      setPasswordValid('Password must be min 8 characters in length and contain lowercase [a-z], uppercase [A-Z], numeric [0-9].');  
    } else {
      setPasswordValid('');
    } 
  }, [password]);

  // validate email
  useEffect(() => {  
    const validateEmail = (email) => {
      const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return email.length && !expression.test(email);
    }  
    if(validateEmail(email)) {
      setEmailValid('Email is not valid.');
    } else {
      setEmailValid('');
    }   
  }, [email]);

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = async () => {
    console.log('SignupForm handleNext activeStep',activeStep)
    console.log(usernameValid , username , passwordValid , password)
    if(!usernameValid.length && username.length && !passwordValid.length && password.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if(activeStep === 0) {
        console.log('activeStep',activeStep)
      }
      if(activeStep === 1) {
        console.log('activeStep',activeStep)
        console.log('username',username, password,first_name,last_name,email)
        handleSignup({username, password,first_name,last_name,email});
      }
      if(activeStep === 2) {
        console.log('activeStep === steps.length-1',activeStep, photo_details)
        // handleSubmit({
        //   first_name,
        //   last_name, 
        //   email, 
        //   photo_id: photo_details.photo_id,
        //   city, 
        //   state, 
        //   country
        // });
      }
    }
    
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <div component={'span'} className={classes.main}>All steps completed</div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div component={'span'}>
              {activeStep===0 ?
              (
                <div className={classes.main}>
                  <TextField                     
                    className={classes.formElement} 
                    label='Username: (required)' 
                    variant='outlined' 
                    value={username} 
                    // autoFocus={true}
                    inputRef={input => !username.length && input && input.focus()}
                    error={usernameValid.length ? true : false}
                    helperText= {usernameValid.length ? usernameValid : ''}
                    onChange={e => setUsername(e.target.value)}/>
                  <TextField 
                    className={classes.formElement} 
                    label='Password: (required)' 
                    type='password'
                    variant='outlined' 
                    value={password} 
                    error={passwordValid.length ? true : false}
                    helperText={passwordValid.length ? passwordValid : ''}
                    onChange={e => setPassword(e.target.value)}/>
                </div>
              ) :
              activeStep===1 ?
              (
                <div className={classes.main}>
                  <TextField 
                    className={classes.formElement} 
                    label='First Name: (required)' 
                    variant='outlined' 
                    value={first_name} 
                    // autoFocus={true}
                    // ref={ focusUsernameInputField }
                    // autoFocus={true}
                    inputRef={input => !first_name.length && input && input.focus()}
                    onChange={e => setFirstName(e.target.value)}/>
                  <TextField 
                    className={classes.formElement} 
                    label='Last Name: (required)' 
                    variant='outlined' 
                    value={last_name} 
                    onChange={e => setLastName(e.target.value)}/>
                  <TextField 
                    className={classes.formElement} 
                    label='Email: (required)' 
                    variant='outlined' 
                    type='email'
                    value={email} 
                    error={emailValid.length ? true : false}
                    helperText={emailValid.length ? emailValid : ''}
                    onChange={e => setEmail(e.target.value)}/>
                </div>
              ) :
              activeStep===2 ?
              (
                <div className={classes.main}>
                  <TextField 
                    className={classes.formElement} 
                    label='City: (optional)' 
                    variant='outlined' 
                    value={city} 
                    inputRef={input => !city.length && input && input.focus()}
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
                  <UploadPhoto token={token} setPhotoDetails={setPhotoDetails} />
                </div>
              ) :
              (
                <div className={classes.main}>
                  <div>
                    <div>Username: {username}</div>
                    <div>First Name: {first_name}</div>
                    <div>Last Name: {last_name}</div>
                    <div>Email: {email}</div>
                    <div>City: {city}</div>
                    <div>State: {state}</div>
                    <div>Country: {country}</div>
                  </div>
                </div>
              )}</div>
            <div>
              
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              > */}
                {/* { activeStep > 1 && 'Back' }
              </Button> */}
              
              
              <Button 
                className={classes.formElement}
                variant="contained" 
                color="primary" 
                onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
