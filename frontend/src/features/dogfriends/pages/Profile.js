import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Typography from '@material-ui/core/Typography';
import { useFormInput } from '../hooks/useFormInput';
import { AuthContext } from '../context/AuthContext';
import FormInputOutlined from '../components/FormInputOutlined';
import { patchUserInfo } from '../api/DogfriendsApi';
import { useHistory } from 'react-router-dom';

import { selectUser, getUserInfoData } from '../dogfriendsUserSlice';
import { useSelector, useDispatch } from 'react-redux';

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


const Profile = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {
    const usr = auth.authState.userInfo.username;
    const token = auth.authState.token;
    const payload = {
      username: usr,
      token: token
    }
    console.log('Profile useEffect payload',payload)
    dispatch(getUserInfoData(payload));
    // eslint-disable-next-line
  }, [dispatch]);
  const userList = useSelector(selectUser);
  console.log('Profile userList',userList)
  const history = useHistory();  
  const password = useFormInput('', '', 'password');
  const first_name = useFormInput('first_name');
  const last_name = useFormInput('last_name');
  const photo_url = useFormInput('photo_url');
  const email = useFormInput('email');
  const city = useFormInput('city');
  const state = useFormInput('state');
  const country = useFormInput('country');

  const handleSubmitPatch = async () => {
    try {
      const data = {
        username: auth.authState.userInfo.username,
        password: password.value, 
        first_name: first_name.value, 
        last_name: last_name.value, 
        email: email.value,
        photo_url: photo_url.value,
        city: city.value, 
        state: state.value, 
        country: country.value
      }
      console.log('handleSubmitPatch data',data)
      console.log('handleSubmitPatch auth.authState',auth.authState)
      // data - user info collected from the form inputs
      // The one column that will change is photo_url -> photo_id
      // photo_url is inserted into table photos and we use the id of that record
      // to refer to that photo
      await patchUserInfo(auth.authState.token, data);
      auth.setAuthState({
        token: auth.authState.token,
        userInfo: data
      });
      history.push(`/`);
    } catch (error) {
      console.log(error)
    }    
  }
  
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['User Info', 'Contact', 'Confirm'];

  const handleNext = () => {
    if(activeStep === 0) {
      if(password.value.length && first_name.value.length && last_name.value.length) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if(activeStep === 1) {
      if(email.value.length && city.value.length && state.value.length && country.value.length) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      handleSubmitPatch();
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
          <FormInputOutlined label='Password' formInput={password} />
          <FormInputOutlined label='First Name' formInput={first_name}/>
          <FormInputOutlined label='Last Name' formInput={last_name} />
          <FormInputOutlined label='Photo URL' formInput={photo_url} />              
        </form> :
        activeStep === 1 ?
        <form className={classes.form}> 
          <FormInputOutlined label={'Email'} formInput={email} />
          <FormInputOutlined label={'City'} formInput={city} />
          <FormInputOutlined label={'State'} formInput={state} />
          <FormInputOutlined label={'Country'} formInput={country} />        
        </form> :
        <>
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
export default Profile;