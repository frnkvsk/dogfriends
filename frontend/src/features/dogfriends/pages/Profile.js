import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import UserInfoForm from '../components/UserInfoForm';
import { updateUserInfoSlice } from '../dogfriendsUserSlice';
import { addAvatarUrl } from '../dogfriendsAvatarSlice';
import { v4 as uuid } from 'uuid';
// import { putNewPhoto } from '../api/DogfriendsPhotosApi';

const Profile = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  console.log('Profile auth',auth)
  const handleSubmit = (data) => {
    if(data.imageBase64) {
      const photo_id = 'sm-' + uuid();
      // put photo in AWS S3 bucket with lambda function
      // post photo to db photos table
      // putNewPhoto(imageBase64, photo_id, AWS_UPLOAD_IMAGE_LAMBDA_URL, auth.authState.token);
      data['photo_id'] = photo_id;
    }
    // delete data.image;



    //TODO: make avatarSlice to hold imageBase64






    // const payload = {
    //   toDatabase: {},
    //   toRedux: {}
    // }
    dispatch(addAvatarUrl(data.imageBase64))
    data._token = auth.authState.token;
    data.username = auth.authState.userInfo.username;
    // payload.toRedux['user'] = Object.assign({}, data);
    delete data.imageBase64;
    // payload.toDatabase = data;
    
    console.log('Profile handleSubmit data',data)
    dispatch(updateUserInfoSlice(data));
  }
  return (
    <UserInfoForm title="Edit Profile" handleSubmit={handleSubmit}/>
  );
}
export default Profile;