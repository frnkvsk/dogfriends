import React, { useContext } from 'react';

import { 
  // Grid,
  // Button,
  Typography,
  makeStyles,
 } from '@material-ui/core';
 
// import ButtonArrow from '../components/ButtonArrow';
import PostList from '../components/PostList';
import { AuthContext } from '../context/AuthContext';

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
  const username = auth.authState.userInfo.username;
  
  
  return (        
    <div>
      <div sm item>
        <div>
          <div className={classes.heading}>
            {username ? 
            <Typography variant='h2' align='center'>
              Welcome back {username}.
            </Typography> :
            <Typography variant='h2' align='center'>
              Share Your Dog Photos
              <br />
              with other dog friends
            </Typography>
            }
          </div>         
        </div>
      </div>
      <div sm item>
        <div className={classes.cardImageList}>
          <PostList imageCount={10} />
        </div>        
      </div>
    </div>    
  );
}

export default Home;