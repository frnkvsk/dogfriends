
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';

import {  
  selectUser, 
  addUserInfo } from '../dogfriendsUserSlice';
import { addAvatarUrl } from '../dogfriendsAvatarSlice';
import { v4 as uuid } from 'uuid';

import { putNewPhoto } from '../api/DogfriendsPhotosApi';
import {
  patchUserInfo,
} from '../api/DogfriendsApi';
import ProfileForm from '../components/ProfileForm';

const useStyles = makeStyles((theme) => ({
  successMessage: {
    color: '#75a478',
    backgroundColor: '#d7ffd9',

  },
  errorMessage: {
    color: '#ba6b6c',
    backgroundColor: '#ffcccb',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const selectUserInfo = useSelector(selectUser);
  const [statusMessage, setStatusMessage] = useState('');
  const dispatch = useDispatch();
  console.log('Profile auth',auth)

  const commitProfile = async (data) => {   
    const photo_id = data.photo_id.length ? data.photo_id : 'sm-' + uuid() + '.txt';
    const imageUrl = data.imageUrl;
    const aws_endpoint_up = selectUserInfo.data.aws_bucket_endpoint_up;
    const aws_endpoint_down = selectUserInfo.data.aws_bucket_endpoint_down;
    const token = auth.authState.token; 
    try {
      if(data.imageUrl) {
        await putNewPhoto(imageUrl, photo_id, aws_endpoint_up, token, aws_endpoint_down);
      }
      dispatch(addAvatarUrl({photo_id, imageUrl}));
      data['photo_id'] = photo_id;
      data._token = auth.authState.token;
      data.username = auth.authState.userInfo.username;
      delete data.imageUrl;
      dispatch(addUserInfo(data));
      await patchUserInfo(data);
      setStatusMessage(<div className={classes.successMessage}>Success in updating your user information.</div>);
    } catch (error) {
      setStatusMessage(<div className={classes.errorMessage}>Error in updating your user information.</div>);
    }
       
  } 
  const handleSubmit = (data) => {
    commitProfile(data);
  }
  return (
    <>
    <div>{statusMessage}</div>
    <ProfileForm title="Edit Profile" handleSubmit={handleSubmit}/>
    </>
  );
}
export default Profile;