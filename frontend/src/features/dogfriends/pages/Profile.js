import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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

const Profile = () => {
  const auth = useContext(AuthContext);
  const selectUserInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log('Profile auth',auth) 
  // const AWS_UPLOAD_IMAGE_LAMBDA_URL='https://3ynkxwkjf5.execute-api.us-west-2.amazonaws.com/dev/upload';
  const commitProfile = async (data) => {   
    const photo_id = data.photo_id.length ? data.photo_id : 'sm-' + uuid() + '.txt';
    const imageUrl = data.imageUrl;
    const aws_endpoint_up = selectUserInfo.data.aws_bucket_endpoint_up;
    const aws_endpoint_down = selectUserInfo.data.aws_bucket_endpoint_down;
    const token = auth.authState.token; 
    if(data.imageUrl) {
      
      console.log('Profile putNewPhoto ',imageUrl, photo_id, aws_endpoint_up, token, aws_endpoint_down)
      // put photo in AWS S3 bucket with lambda function and 
      // post new record to photo database table
      try {
        await putNewPhoto(imageUrl, photo_id, aws_endpoint_up, token, aws_endpoint_down);
      } catch (error) {
        console.error(error);
      }          
    } 
    
    console.log('Profile dispatch(addAvatarUrl {photo_id, imageUrl}',{photo_id, imageUrl})
    try {
      dispatch(addAvatarUrl({photo_id, imageUrl}));
    } catch (error) {
      console.error(error);
    }
    
    data['photo_id'] = photo_id;
    data._token = auth.authState.token;
    data.username = auth.authState.userInfo.username;
    delete data.imageUrl;

    console.log('Profile commitProfile data',data)
    // save user information data to Redux
    try {
      dispatch(addUserInfo(data));
    } catch (error) {
      console.error(error);
    }
    
    // update user database table 
    try {
      await patchUserInfo(data);
    } catch (error) {
      console.error(error);
    }
       
  } 
  const handleSubmit = (data) => {
    // console.log('Profile handleSubmit data',data)
    commitProfile(data);
  }
  return (
    <ProfileForm title="Edit Profile" handleSubmit={handleSubmit}/>
  );
}
export default Profile;