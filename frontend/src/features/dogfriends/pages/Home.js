import React, { useContext } from 'react';

import { 
  Grid,
  Button,
  Typography,
  makeStyles,
 } from '@material-ui/core';
 
import ButtonArrow from '../components/ButtonArrow';
import PostList from '../components/PostList';
import { AuthContext } from '../context/AuthContext';
// import temp from '../../../temp';
// import byteText from URL('https://dogfriends.s3-us-west-2.amazonaws.com/ad437f7b-c0e9-40df-8ca2-0af2056f967b.txt');
// import imgTemp = from URL('https://dogfriends.s3-us-west-2.amazonaws.com/905a85a5-9586-4db5-b5ef-f238c20fa87e.txt');
// import {
//   getPhotoById
// } from '../api/DogfriendsPhotosApi';

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
    <>
    <Grid container direction='column'>
      <Grid sm item>
        <Grid container justify='center' alignItems='center' direction='row'>
          <Grid container className={classes.heading}>
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
          </Grid>
          <Grid container className={classes.buttons}>            
            {!username && 
              <Grid item>
                <Button variant='contained'>
                Get Started
                <ButtonArrow width='15' height='15' fill='red' />
              </Button>
              </Grid>
            }            
          </Grid>          
        </Grid>
      </Grid>
      <Grid sm item>
        <Grid container className={classes.cardImageList}>
          <PostList imageCount={10} />
        </Grid>        
      </Grid>
    </Grid>
    </>
  );
}

export default Home;