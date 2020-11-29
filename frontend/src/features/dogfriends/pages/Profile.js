import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import UserInfoForm from '../components/UserInfoForm';
import { updateUserInfoSlice } from '../dogfriendsUserSlice';


const Profile = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  console.log('Profile auth',auth)
  const handleSubmit = ({
    first_name,
    last_name, 
    email, 
    photo_details,
    city, 
    state, 
    country, 
    }) => {
    const userInfo = {
      first_name,
      last_name, 
      email, 
      photo_details,
      city, 
      state, 
      country, 
   }
    userInfo._token = auth.authState.token;
    userInfo.username = auth.authState.userInfo.username;
    dispatch(updateUserInfoSlice(userInfo));
  }
  return (
    <UserInfoForm title="Edit Profile" handleSubmit={handleSubmit}/>
  );
}
export default Profile;