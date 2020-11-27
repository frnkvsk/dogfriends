import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { AuthContext } from '../context/AuthContext';;
// import { useHistory } from 'react-router-dom';
// import { selectUser, getUserInfoSlice } from '../dogfriendsUserSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import UserAvatar from '../components/UserAvatar';
// import { Button, IconButton, TextField } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
// import { geolocated } from "react-geolocated";
import UserInfoForm from '../components/UserInfoForm';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     width: '100%',
//     minHeight: '100vh',
//     maxWidth: '700px',
//     padding: '2px',
//     height: '100vh',
//     border: '1px solid red',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     width: 'auto',
//     fontSize: '24px',
//     border: '1px solid green',
//   },
//   formElement: {
//     // display: 'flex',
//     // alignItems: 'center',
//     // justifyContent: 'space-between',
//     width: 'auto',
//     margin: '10px 15px',
//     // cursor: 'pointer',
//   },
//   formAvatar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     margin: '20px 15px',
//     border: '1px solid pink',
//   },
//   formLabel: {
//     // display: 'flex',
//     margin: '10px 20px 15px',
//   },
//   button: {
//     borderRadius: '12px',
//     marginLeft: '10px',
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     height: '50px',
//     margin: '20px 0 20px 0',
//     // border: '1px solid orange',
//     '& p': {
//       fontSize: '38px',
//       color: 'green',
//       // border: '1px solid pink',
//     },
//     '& button': {
//       height: '30px',
//     }
//   }

// }));


const Profile = () => {
  const handleSubmit = ({
    first_name,
    last_name, 
    email, 
    photo_details,
    city, 
    state, 
    country, 
 }) => {
    console.log('Profile handleSubmit',first_name,
    last_name, 
    email, 
    photo_details,
    city, 
    state, 
    country,)
  }
  return (
    <UserInfoForm title="Edit Profile" handleSubmit={handleSubmit}/>
  );
}
export default Profile;