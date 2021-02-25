import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/AuthContext';
import { 
  selectUser,
  getUserInfoSlice } from '../dogfriendsUserSlice';
import { useSelector } from 'react-redux';
import UserAvatar from '../components/UserAvatar';
import { Button, TextField } from '@material-ui/core';
import {UploadImage} from './UploadImage';
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
  },
  imagePreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100px',
    maxHeight: '100px',
    // marginLeft: '7px',
  }

}));


const UserInfoForm = ({title, handleSubmit}) => {
  // const AWS_UPLOAD_IMAGE_LAMBDA_URL='https://3ynkxwkjf5.execute-api.us-west-2.amazonaws.com/dev/upload';
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  console.log('UserInfoForm auth',auth)
  const userList = useSelector(selectUser);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo_id, setPhotoId] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [imageBase64, setImageBase64] = useState(null);

  useEffect(() => {
    if(userList.status === 'fulfilled') {
      setUsername(userList.data.user.username);
      setFirstName(userList.data.user.first_name);
      setLastName(userList.data.user.last_name);
      setEmail(userList.data.user.email);
      setPhotoId(userList.data.user.photo_id);
      setCity(userList.data.user.city);
      setState(userList.data.user.state);
      setCountry(userList.data.user.country);
    } else {
      const payload = {
        'username': auth.authState.userInfo.username,
        'token': auth.authState.token,
      }
      dispatch(getUserInfoSlice(payload));      
    }
    console.log('UserInfoForm useEffect userList',userList)
    // eslint-disable-next-line
  }, [userList.status])
  
  

  const [photoDropVisibility, setPhotoDropVisibility] = useState('none');
  const history = useHistory();  
  
  const handleClick = () => {    
    handleSubmit({
       first_name,
       last_name, 
       email, 
       photo_id,
       city, 
       state, 
       country, 
       imageBase64
    });
  }
  const handleUploadImage = async (canvas, imageUrl) => {
    setImageBase64(imageUrl);
  }
  console.log('UserInfoForm userList',userList)
  return (
    <div className={classes.root}>
      
      <div className={classes.header}>
        <p>{title}</p>
        <Button className={classes.button} variant="contained" onClick={() => history.push('/')}>
          Cancel
        </Button> 
        <Button className={classes.button} variant="contained" onClick={handleClick}>
          Done
        </Button>
      </div>
      <div style={{display: photoDropVisibility}}>
        <UploadImage handleUploadImage={handleUploadImage} width={100} height={100} />
      </div>
      <div className={classes.imagePreview} >
        <img id='uploadIMG' name='uploadImage' src={imageBase64} alt=''/>
      </div>
      <div className={classes.form}>
        <div className={classes.formAvatar} >          
          {/* <UserAvatar /> */}
          <UserAvatar photo_url={imageBase64}/>
          {username}
          <Button 
            name="avatar" 
            onClick={() => setPhotoDropVisibility('inline')}
            // onClick={handleOpenModel}
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