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
    border: '1px solid red'
  },
  backButton: {
    margin: '10px',
  },
  main: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%',
    // minWidth: '400px',
    
    // border: '1px solid #e0e0e0',
    // [theme.breakpoints.down('md')]: {
    //   width: '100%',
    //   margin: '0px'
    // },
    // [theme.breakpoints.up('lg')]: {
    //   width: '85%',
    //   margin: '25px 0 25px 0',
    // },
    // [theme.breakpoints.up('xl')]: {
    //   width: '75%',
    //   margin: '25px 0 25px 0',
    // },
  },
  formElement: {
    width: '95%',
    margin: '10px'
  },
}));

function getSteps() {
  return ['Create a username and password (required)', 'Enter your contact info (required)', 'Further define your account (optional)', 'Review and confirm account creation'];
}

export default function SignupForm({ handlePreSignup, handleSignup }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const token = auth.authState.token;
  console.log('SignupForm token',token)
  // Step 1 (required) make sure username and password are valid
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState('');

  // Step 2 (required) make sure email is valid and complete registration process
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');  
  const [email, setEmail] = useState('');
  
  // Step 3 (optional) allow the option for new user to further define their account 
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const [photo_details, setPhotoDetails] = useState({
    photo_id: null,
    photo_url: null
  });

  useEffect(() => {
    const checkUsername = async () => {
      const res = await handlePreSignup({username});
      console.log('SignupForm useEffect checkUsername res',res.payload.resp);
      if(res.payload.resp) setUsernameValid('Username is already taken.');
    }
    console.log('SignupForm useEffect username',username)
    if(username.length && username.length < 3) setUsernameValid('Username must be at least 3 characters.');
    else if (username.length) {
      setUsernameValid('');
      checkUsername(); 
    } else {
      setUsernameValid('');
    }
  }, [username, handlePreSignup]);

  // verify if username passes strength test
  useEffect(() => {
    
    console.log('SignupForm useEffect password',password)
    if(password.length && password.length < 8) setPasswordValid('Password must be at least 8 characters.');
    else if (password.length >= 8) {
      if(!/[a-zA-Z]/.test(password) || !/[\d]/.test(password)) {
        setPasswordValid('Password must contain alphabetic letters and numbers.');  
      } else {
        setPasswordValid('');
      }            
    } else {
      setPasswordValid('');
    }
  }, [password]);

  const handleSetUsername = e => {
    setUsername(e.target.value)
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = async () => {
    if(!usernameValid.length && username.length && !passwordValid.length && password.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log('activeStep1',activeStep)
      if(activeStep === 0) {
        console.log('activeStep',activeStep)
        console.log('check if username is available username',username)
        console.log('handlePreSignup',handlePreSignup)
      }
      if(activeStep === 1) {
        console.log('activeStep === 1')
        const resp = await handleSignup({
          username,
          password,
          first_name,
          last_name, 
          email, 
          photo_id: null,
          city, 
          state, 
          country
        });
        console.log('SignupForm handleNext resp',resp)
        setUsernameValid(resp)
      }
      if(activeStep === steps.length-1) {
        console.log('activeStep === steps.length =>',activeStep,'  photo_details',photo_details)
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
                    error={usernameValid.length}
                    helperText= {usernameValid.length ? usernameValid : ''}
                    onChange={e => setUsername(e.target.value)}/>
                  <TextField 
                    className={classes.formElement} 
                    label='Password: (required)' 
                    type='password'
                    variant='outlined' 
                    value={password} 
                    error={passwordValid.length}
                    helperText= {passwordValid.length ? passwordValid : ''}
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
                    value={email} 
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
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
