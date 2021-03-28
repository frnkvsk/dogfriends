import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { 
  Button, 
  TextField,
 } from '@material-ui/core';
 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
  },
  formElement: {
    width: '95%',
    margin: '10px', 
  },
  button: {
    marginTop: '15px',
  },
  table: {
    border: '1px solid #EEF1F1',
    width: '100%',
    minWidth: '435px',  
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    fontSize: '22px',
    marginLeft: '5px',
  }
}));

function getSteps() {
  return [
    'Create a username and password (required)', 
    'Enter your contact info (required)', 
    'Further define your account (optional)', 
    'Review and confirm account creation'
  ];
}

export default function SignupForm({ handlePreSignup, handleSignup }) {
  const classes = useStyles();
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

  // verify username is not already in use and is in valid form
  useEffect(() => {
    const checkUsername = async () => {
      // console.log('SignupForm checkUsername username',username)
      if(username.length) {
        const res = await handlePreSignup({username});
        console.log('-----------res',res, res.payload)
        if(res.resp) {
          setUsernameValid('Username is already taken.');
          // console.log('--------setUsernameValie','Username is already taken.')
        }
          
      }      
    }
    const validateUsername = (username) => {
      const expression = /^\s*[a-zA-Z]\s*(?:\S[\t ]*){2,30}/;    
      return expression.test(username) && username.length < 31;
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
    const validatePassword = (password) => {
      return password.length && (
        password.length < 8 || 
        password.length > 30 ||
        !/[a-z]/.test(password) || 
        !/[A-Z]/.test(password) || 
        !/[\d]/.test(password)
      );
    }
    if(validatePassword(password)) {
      setPasswordValid('Password must be 8-30 characters in length and contain lowercase [a-z], uppercase [A-Z], numeric [0-9].');  
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
    // console.log('HandleNext')
    switch(activeStep) {
      case 0:
        if(!usernameValid.length && username.length && !passwordValid.length && password.length) {
          setActiveStep((activeStep) => activeStep + 1);
        }          
        break;
      case 1:
        if(first_name.length && last_name.length && !emailValid.length && email.length) {
          setActiveStep((activeStep) => activeStep + 1);
        }
        break;
      case 2:
        setActiveStep((activeStep) => activeStep + 1);
        break;
      default:
        setActiveStep((activeStep) => activeStep + 1);
        handleSignup({username, password,first_name,last_name,email,admin:false});
    }    
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
      <div className={classes.main}>
        {activeStep === steps.length ? (
          <div>
            <div component={'span'} className={classes.main}>All steps completed</div>
            <Button 
              variant='contained'
              color='secondary'
              onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div >
            <div component={'span'}>
              {activeStep===0 ?
              (
                <div className={classes.main}>
                  <TextField   
                    inputProps={{
                      'data-testid': 'username'
                    }}                 
                    className={classes.formElement} 
                    label='Username: (required)' 
                    variant='outlined' 
                    value={username} 
                    inputRef={input => !username.length && input && input.focus()}
                    error={usernameValid.length ? true : false}
                    helperText= {usernameValid.length ? usernameValid : ''}
                    onChange={e => setUsername(e.target.value)}/>
                  <TextField 
                    inputProps={{
                      'data-testid': 'password'
                    }}
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
                    inputProps={{
                      'data-testid': 'first_name'
                    }}
                    className={classes.formElement} 
                    label='First Name: (required)' 
                    variant='outlined' 
                    value={first_name} 
                    inputRef={input => !first_name.length && input && input.focus()}
                    onChange={e => setFirstName(e.target.value)}/>
                  <TextField 
                    inputProps={{
                      'data-testid': 'last_name'
                    }} 
                    className={classes.formElement} 
                    label='Last Name: (required)' 
                    variant='outlined' 
                    value={last_name} 
                    onChange={e => setLastName(e.target.value)}/>
                  <TextField 
                    inputProps={{
                      'data-testid': 'email'
                    }} 
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
                    inputProps={{
                      'data-testid': 'city'
                    }} 
                    className={classes.formElement} 
                    label='City: (optional)' 
                    variant='outlined' 
                    value={city} 
                    inputRef={input => !city.length && input && input.focus()}
                    onChange={e => setCity(e.target.value)}/>
                  <TextField 
                    inputProps={{
                      'data-testid': 'state'
                    }} 
                    className={classes.formElement} 
                    label='State: (optional)' 
                    variant='outlined' 
                    value={state} 
                    onChange={e => setState(e.target.value)}/>
                  <TextField 
                    inputProps={{
                      'data-testid': 'country'
                    }} 
                    className={classes.formElement} 
                    label='Country: (optional)' 
                    variant='outlined' 
                    value={country} 
                    onChange={e => setCountry(e.target.value)}/>
                </div>
              ) :
              (
                <div className={classes.main}>
                  <table className={classes.table}>
                    <tbody>
                      <tr className={classes.tableRow}>
                        <td style={{paddingLeft: '8px'}}>Username: {username}</td>
                      </tr>
                      <tr className={classes.tableRow}>
                      <td style={{paddingLeft: '8px'}}>First Name: {first_name}</td>
                      </tr>
                      <tr className={classes.tableRow}>
                      <td style={{paddingLeft: '8px'}}>Last Name: {last_name}</td>
                      </tr>
                      <tr className={classes.tableRow}>
                      <td style={{paddingLeft: '8px'}}>Email: {email}</td>
                      </tr>
                      <tr className={classes.tableRow}>
                      <td style={{paddingLeft: '8px'}}>City: {city}</td>
                      </tr>
                      <tr className={classes.tableRow}>
                      <td style={{paddingLeft: '8px'}}>State: {state}</td>
                      </tr>
                      <tr className={classes.tableRow}>
                      <td style={{paddingLeft: '8px'}}>Country: {country}</td>
                      </tr>
                    </tbody>                    
                  </table>
                </div>
              )}</div>
            <div>
              <Button 
                className={classes.button}
                variant='contained'
                color='primary'
                fullWidth={true}
                onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Complete Signup' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
