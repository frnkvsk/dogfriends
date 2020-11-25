/** Login and Signup */
import React from 'react';
import UserInfoForm from './UserInfoForm';

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
//   },
//   form: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//   },
//   button: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     margin: '10px 20px 15px',
//   },
//   err: {
//     color: '#ff1744',
//     fontSize: '24px',
//   },
//   backButton: {
//     marginRight: theme.spacing(1),
//   },
//   completed: {
//     display: 'inline-block',
//   },

// }));


export default function SignupForm() { 
  
  return (
    <UserInfoForm title="Register" />
  );
    
}
