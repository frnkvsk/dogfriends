import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Button, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Typography from '@material-ui/core/Typography';
// import { useFormInput } from '../hooks/useFormInput';
import { AuthContext } from '../context/AuthContext';
// import FormInputOutlined from '../components/FormInputOutlined';
// import { patchUserInfo } from '../api/DogfriendsApi';
import { useHistory } from 'react-router-dom';

import { selectUser, getUserInfoData } from '../dogfriendsUserSlice';
import { useSelector, useDispatch } from 'react-redux';
import UserAvatar from '../components/UserAvatar';


// import Tooltip from '@material-ui/core/Tooltip';
import { Button, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';



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
    border: '1px solid red',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 'auto',
    fontSize: '24px',
    border: '1px solid green',
  },
  formElement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 20px 15px',
    // cursor: 'pointer',
  },
  formLabel: {
    // display: 'flex',
    margin: '10px 20px 15px',
  },
  button: {
    borderRadius: '12px',
    marginLeft: '10px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    margin: '20px 0 20px 0',
    // border: '1px solid orange',
    '& p': {
      fontSize: '38px',
      color: 'green',
      // border: '1px solid pink',
    },
    '& button': {
      height: '30px',
    }
  }

}));


const Profile = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const userList = useSelector(selectUser);

  console.log('Profile userList',userList)
  const username = userList.data.user.username;
  const first_name = userList.data.user.first_name;
  const last_name = userList.data.user.last_name;
  const [email, setEmail] = useState(userList.data.user.email);
  const [photo_id, setPhotoId] = useState(userList.data.user.photo_id);
  const [city, setCity] = useState(userList.data.user.city);
  const [state, setState] = useState(userList.data.user.state);
  const [country, setCountry] = useState(userList.data.user.country);
  
  const dispatch = useDispatch();
  // const []
  // useEffect(() => {
  //   const usr = auth.authState.userInfo.username;
  //   const token = auth.authState.token;
  //   const payload = {
  //     username: usr,
  //     token: token
  //   }
  //   console.log('Profile useEffect payload',payload)
  //   dispatch(getUserInfoData(payload));
  //   // eslint-disable-next-line
  // }, [dispatch]);
  
  console.log('Profile userList',userList)
  const history = useHistory();  
  
  const handleClick = (target) => {
    console.log(target)
  }
  
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <p>Edit Profile</p>
        <Button name="avatar" className={classes.button} variant="contained">
          Cancel
        </Button> 
        <Button name="avatar" className={classes.button} variant="contained">
          Done
        </Button>
      </div>
     
    <div className={classes.form}>
      <div className={classes.formElement} onClick={() => handleClick('avatar')}>          
        <UserAvatar />
        {username}
        <Button name="avatar" className={classes.button} variant="contained">
          Change
        </Button>      
      </div>
      <TextField className={classes.formElement} label='First Name:' variant='outlined' defaultValue={first_name}/>
      <TextField className={classes.formElement} label='Last Name:' variant='outlined' defaultValue={last_name}/>
      <TextField className={classes.formElement} label='Email:' variant='outlined' defaultValue={email}/>
      <TextField className={classes.formElement} label='City:' variant='outlined' defaultValue={city}/>
      <TextField className={classes.formElement} label='State:' variant='outlined' defaultValue={state}/>
      <TextField className={classes.formElement} label='Country:' variant='outlined' defaultValue={country}/>
      {/* <div className={classes.formElement} onClick={() => handleClick('avatar')}>          
        <UserAvatar />
        <Button name="avatar" className={classes.button} variant="contained">
          Change
        </Button>      
      </div>
      <div className={classes.formLabel}>Username: {username}</div>
      <div className={classes.formLabel}>First: {first_name}</div>
      <div className={classes.formLabel}>Last: {last_name}</div>
      <div className={classes.formElement} onClick={() => handleClick('email')}>
        Email: 
        <IconButton name="email" aria-label="edit">
          {email} &nbsp;&nbsp;
          <EditIcon className={classes.icon}/>
        </IconButton>      
      </div>
      <div className={classes.formElement} onClick={() => handleClick('city')}>
        City: 
        <IconButton name="city" aria-label="edit">
          {city} &nbsp;&nbsp;
          <EditIcon className={classes.icon}/>
        </IconButton>      
      </div>
      <div className={classes.formElement} onClick={() => handleClick('state')}>
        State: 
        <IconButton name="state" aria-label="edit">
          {state} &nbsp;&nbsp;
          <EditIcon className={classes.icon}/>
        </IconButton>      
      </div>
      <div className={classes.formElement} onClick={() => handleClick('country')}>
        Country: 
        <IconButton name="country" aria-label="edit">
          {country} &nbsp;&nbsp;
          <EditIcon className={classes.icon}/>
        </IconButton>      
      </div> */}
    </div>
    </div>
  );
}
export default Profile;