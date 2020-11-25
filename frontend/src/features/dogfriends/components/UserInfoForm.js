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

import { selectUser, getUserInfoSlice, setUserList } from '../dogfriendsUserSlice';
import { useSelector, useDispatch } from 'react-redux';
import UserAvatar from '../components/UserAvatar';


// import Tooltip from '@material-ui/core/Tooltip';
import { Button, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import ModalUploadPhoto from './ModalUploadPhoto';
import UploadPhoto from './UploadPhoto';


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
    width: '100%',
    fontSize: '24px',
    border: '1px solid green',
  },
  formElement: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: 'auto',
    margin: '10px 15px',
    // cursor: 'pointer',
  },
  formAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 15px',
    border: '1px solid pink',
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
    justifyContent: 'space-around',
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


const UserInfoForm = ({title}) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const userList = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log('Profile userList',userList)
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo_details, setPhotoDetails] = useState({
    photo_id: null,
    photo_url: null
  });
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  
  useEffect(() => {
    if(userList.status === 'fulfilled') {
      setUsername(userList.data.user.username);
      setFirstName(userList.data.user.first_name);
      setLastName(userList.data.user.last_name);
      setEmail(userList.data.user.email);
      setPhotoDetails({
        photo_id: userList.data.user.photo_id,
        photo_url: userList.data.user.photo_url
      });
      setCity(userList.data.user.city);
      setState(userList.data.user.state);
      setCountry(userList.data.user.country);
    }
    console.log('Profile useEffect userList',userList)
  }, [userList.status])
  
  const handleChange = () => {

  }
  
  // const []
  useEffect(() => {
    if(photo_details.photo_id) {
      let newAuthState = {
        ...auth.authState
      }
      newAuthState.userInfo.photo_id = photo_details.photo_id;
      auth.setAuthState(newAuthState);
      
      let newList = {
        ...userList.data.user
      }
      newList.photo_id = photo_details.photo_id;

      dispatch(setUserList(newList));
      console.log('UserInfoForm useEffect userList',userList)
    }
    // eslint-disable-next-line
  }, [photo_details.photo_id, photo_details.photo_url]);

  const [showModal, setShowModel] = useState('none');
  console.log('Profile userList',userList)
  const history = useHistory();  
  
  const handleClick = (target) => {
    console.log(target)
  }
  const handleOpenModel = () => {
    setShowModel('inline');
  }
  console.log('UserInfoForm photo_details',photo_details)
  return (
    <div className={classes.root}>
      <div style={{display: showModal}}>
        <UploadPhoto token={auth.authState.token} setPhotoDetails={setPhotoDetails}/>
      </div>
      <div className={classes.header}>
        <p>{title}</p>
        <Button name="avatar" className={classes.button} variant="contained">
          Cancel
        </Button> 
        <Button name="avatar" className={classes.button} variant="contained">
          Done
        </Button>
      </div>
     
    <div className={classes.form}>
      <div className={classes.formAvatar} onClick={() => handleClick('avatar')}>          
        <UserAvatar photo_url={photo_details.photo_url}/>
        {username}
        <Button 
          name="avatar" 
          onClick={handleOpenModel}
          className={classes.button} 
          variant="contained">
          Change
        </Button>      
      </div>
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
     
    </div>
    </div>
  );
}
export default UserInfoForm;