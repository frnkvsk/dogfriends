// import React, { useContext } from 'react';
// import { useDispatch } from 'react-redux';
// import { AuthContext } from '../context/AuthContext';
// import { signUpSlice } from '../dogfriendsUserSlice';
// import SignupForm from './SignupForm';


// export default function Signup() { 
//   const auth = useContext(AuthContext);
//   const dispatch = useDispatch();
//   console.log('SignupForm auth',auth)
//   const handleSubmit = ({
//     first_name,
//     last_name, 
//     email, 
//     photo_id,
//     city, 
//     state, 
//     country 
//     }) => {
//     const userInfo = {
//       first_name,
//       last_name, 
//       email, 
//       photo_id,
//       city, 
//       state, 
//       country 
//     }
//     userInfo._token = auth.authState.token;
//     userInfo.username = auth.authState.userInfo.username;
//     dispatch(signUpSlice(userInfo));
//   }
//   return (
//     <SignupForm handleSubmit={handleSubmit} />
//   );
    
// }
