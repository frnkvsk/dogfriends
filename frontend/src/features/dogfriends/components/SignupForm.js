/** Login and Signup */
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Typography from '@material-ui/core/Typography';
import { useFormInput } from '../hooks/useFormInput';
import { AuthContext } from '../context/AuthContext';
import FormInputOutlined from './FormInputOutlined';
import { signup } from '../api/DogfriendsApi';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '100vh',
    maxWidth: '700px',
    padding: '2px',
    height: '100vh',
  },
  form: {
    width: '100%',
    backgroundColor: '#ffffff',
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
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },

}));


export default function SignupForm() {
  const classes = useStyles();
  const history = useHistory();
  const username = useFormInput();
  const password = useFormInput('', 'password');
  const first_name = useFormInput();
  const last_name = useFormInput();  
  const photo_url = useFormInput();
  const email = useFormInput();
  const city = useFormInput();
  const state = useFormInput();
  const country = useFormInput();
  const auth = useContext(AuthContext);

  const handleSubmitSignup = async () => {
    // setErrorMessage(false);
    try {
      const data = {
        username: username.value, 
        password: password.value, 
        first_name: first_name.value, 
        last_name: last_name.value, 
        email: email.value,
        photo_url: photo_url.value,
        city: city.value, 
        state: state.value, 
        country: country.value
      }

      const resp = await signup(data);
      delete data.password;
      auth.setAuthState({
        token: resp.data.token,
        userInfo: {
          ...data
          // username: username.value, 
          // first_name: first_name.value, 
          // last_name: last_name.value, 
          // email: email.value,
          // photo_url: photo_url.value,
          // city: city.value, 
          // state: state.value, 
          // country: country.value
        }
      });
      history.push(`/`);
    } catch (error) {
      // setErrorMessage(true);
      console.log(error)
    }    
  }
  
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['User Info', 'Contact', 'Confirm'];

  const handleNext = () => {
    if(activeStep === 0) {
      if(username.value.length && password.value.length && first_name.value.length && last_name.value.length) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if(activeStep === 1) {
      if(email.value.length && city.value.length && state.value.length && country.value.length) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      console.log('handleSubmitSignup() fired')
      handleSubmitSignup();
    }    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  return (
    <>
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 ?
        <form className={classes.form}> 
          <FormInputOutlined inputRef={input => input && input.focus()} name='usr_name' label='username' formInput={username}/>
          <FormInputOutlined label='Password' formInput={password} />
          <FormInputOutlined label='First Name' formInput={first_name} />
          <FormInputOutlined label='Last Name' formInput={last_name} />
          <FormInputOutlined label='Photo URL' formInput={photo_url} />              
        </form> :
        activeStep === 1 ?
        <form className={classes.form}> 
          <FormInputOutlined inputRef={input => input && input.focus()} label={'Email'} formInput={email} />
          <FormInputOutlined label={'City'} formInput={city} />
          <FormInputOutlined label={'State'} formInput={state} />
          <FormInputOutlined label={'Country'} formInput={country} />        
        </form> :
        <>
        <div>{username.value}</div>
        <div>{first_name.value}</div>
        <div>{last_name.value}</div>
        <div>{email.value}</div>
        <div>{city.value}</div>
        <div>{state.value}</div>
        <div>{country.value}</div>
        </>
      }      

      <div>
        {activeStep === steps.length ? 
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
         : 
          <div>
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
        }
      </div>
    </div>
  
   </>
  );
}
