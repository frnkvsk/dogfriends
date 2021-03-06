import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  TextField,
  Button } from '@material-ui/core';
import { selectUser } from '../dogfriendsUserSlice';
import { selectAvatar } from '../dogfriendsAvatarSlice';
import UserAvatar from './UserAvatar';
import {UploadImage} from './UploadImage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '700px',
    padding: '2px',
    backgroundColor: theme.palette.common.yellowLight,
    border: '1px solid #eeeeee',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    fontSize: '24px',
  },
  formElement: {
    width: 'auto',
    margin: '10px 15px',
  },
  formAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 15px',
    padding: '5px',
    border: '1px solid #00000030',
    '&:hover': {
      border: '1px solid #00000090',
    },
    borderRadius: '5px',
  },
  formLabel: {
    margin: '10px 20px 15px',
  },
  button: {
    // ...theme.typography.button,
    // backgroundColor: theme.palette.common.yellowDark,
    // borderRadius: '22px',
    margin: '0 25px 0 50px',    
    // height: '45px',
    // '&:hover': {
    //   backgroundColor: theme.palette.secondary.light,
    // }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '50px',
    margin: '20px 0 20px 0',
    '& p': {
      fontSize: '38px',
      color: 'green',
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
  }

}));

const ProfileForm = ({title, handleSubmit}) => {  
  const classes = useStyles();
  const selectUserData = useSelector(selectUser);
  const selectAvatarData = useSelector(selectAvatar);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo_id, setPhotoId] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if(selectUserData.status === 'fulfilled') {
      setUsername(selectUserData.data.username ? selectUserData.data.username : '');
      setFirstName(selectUserData.data.first_name ? selectUserData.data.first_name : '');
      setLastName(selectUserData.data.last_name ? selectUserData.data.last_name : '');
      setEmail(selectUserData.data.email ? selectUserData.data.email : '');
      setPhotoId(selectUserData.data.photo_id ? selectUserData.data.photo_id : '');
      setCity(selectUserData.data.city ? selectUserData.data.city : '');
      setState(selectUserData.data.state ? selectUserData.data.state : '');
      setCountry(selectUserData.data.country ? selectUserData.data.country : '');
    }   
    // eslint-disable-next-line
  }, [selectAvatarData.data.imageUrl, selectUserData.data.first_name, selectUserData.data.last_name, selectUserData.data.email, selectUserData.data.photo_id, selectUserData.data.city, selectUserData.data.state, selectUserData.data.country, selectUserData.status]);  

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
       imageUrl
    });
  }
  const handleUploadImage = async (canvas, imageUrl) => {    
    setImageUrl(imageUrl);    
  }
  
  return (
    <div className={classes.root}>      
      <div className={classes.header}>
        <p>{title}</p>
        <Button className={classes.button} color='primary' variant='contained' onClick={handleClick}>
          Done
        </Button>
        <Button className={classes.button} color='secondary' variant='contained' onClick={() => history.push('/')}>
          Cancel
        </Button>         
      </div>
      <div style={{display: photoDropVisibility}}>
        <UploadImage handleUploadImage={handleUploadImage} width={100} height={100} />
      </div>
      <div className={classes.imagePreview} >
        <img id='uploadIMG' name='uploadImage' src={imageUrl} alt=''/>
      </div>
      <div className={classes.form}>
        <div className={classes.formAvatar} >
          <UserAvatar photo_url={imageUrl}/>
          {username}
          <Button 
            name='avatar' 
            onClick={() => setPhotoDropVisibility('inline')}
            className={classes.button} 
            color='primary'
            variant='contained'>
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
export default ProfileForm;