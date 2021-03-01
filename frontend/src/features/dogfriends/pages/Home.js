import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { 
  // Grid,
  // Button,
  Typography,
  makeStyles,
 } from '@material-ui/core';
 
// import ButtonArrow from '../components/ButtonArrow';
import PostList from '../components/PostList';
import { AuthContext } from '../context/AuthContext';
import { selectAvatar } from '../dogfriendsAvatarSlice';

const useStyles = makeStyles((theme) => ({
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    // border: '1px solid red',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    // border: '1px solid blue',
  },
  cardImageList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25px',
    // border: '1px solid red',
  }
}));


const Home = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const selectAvatarData = useSelector(selectAvatar)
  const username = auth.authState.userInfo.username;  
  console.log('Home ',selectAvatarData.data)
  return (        
    <div>      
      <div className={classes.heading}>
        {username ?  
          <Typography variant='h2' align='center'>
          Welcome back {username}.
        </Typography>
         :
        <Typography variant='h2' align='center'>
          Share Your Dog Photos
          <br />
          with other dog friends
        </Typography>
        }
      </div>        
      <div>
        <div className={classes.cardImageList}>
          <PostList imageCount={10} />
        </div>        
      </div>
    </div>    
  );
}

export default Home;