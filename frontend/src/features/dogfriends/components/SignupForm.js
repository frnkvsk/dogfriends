import React, { useState, useContext } from 'react';
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

export default function SignupForm({handleSubmit}) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const token = auth.authState.token;
  console.log('SignupForm token',token)
  // Step 1 (required) make sure username and password are valid
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === 1) {
      console.log('activeStep === 1')
      const resp = await handleSubmit({
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
                    onChange={e => setUsername(e.target.value)}/>
                  <TextField 
                    className={classes.formElement} 
                    label='Password: (required)' 
                    variant='outlined' 
                    value={password} 
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
