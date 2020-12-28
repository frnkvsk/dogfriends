import React, { useState, useEffect, useContext } from 'react';
import {
  useHistory,
  useLocation 
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Hidden,
  Button
} from '@material-ui/core';

import { AuthContext } from '../context/AuthContext';

import footerAdornment from '../assets/footerLogo3.png';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.brown,
    width: '100%',
    zIndex: 1302,
    position: 'fixed',
    left: 0,
    bottom: 0,
    marginTop: '10px',
  },
  adornment: {
    width: '11em',
    verticalAlign: 'bottom',
    [theme.breakpoints.down('md')]: {
      width: '5em',
    },
    [theme.breakpoints.down('xs')]: {
      width: '1em',
    }
  },
  mainContainer: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    
  },
  link: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    margin: '0.5em',
    textDecoration: 'none',
  },
  linkSelected: {
    opacity: 1,
  },
  button: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    height: '2rem',
  },
  gridItem: {
    margin: '2em',
  },

}));
export default function Footer() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const username = auth.authState.userInfo.username;
  const [value, setValue] = useState(0); 

  const listItems = {
    '/': {name: 'Home', index: 0},
    '/about': {name: 'About Us', index: 1},
    '/contact': {name: 'Contact Us', index: 2},
    '/login': {name: 'Logout', index: 3},
    '/profile': {name: 'Profile', index: 4},
    '/new': {name: 'New', index: 5}    
  }

  useEffect(() => {
    console.log('location ',location.pathname)
    setValue(listItems[location.pathname].index);
  }, [listItems, location.pathname]);

  const handleClick = async e => {
    if(!username) {
      history.push('/login');
    } else {
      await auth.setAuthState({token: "", userInfo: {}});
      history.push('/login');
    }    
  }

  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid container className={classes.mainContainer}>
          <Grid item className={classes.gridItem}>
            <Grid container direction='row'>
              <Grid 
                className={classes.button}
                item 
                component={Button} 
                onClick={() => history.push('/')} 
                style={{opacity: value === 0 ? 1 : 0.7}} >
                Home
              </Grid>
              <Grid 
                className={classes.button}
                item 
                component={Button} 
                onClick={() => history.push('/about')} 
                style={{opacity: value === 1 ? 1 : 0.7}} >
                About Us
              </Grid>
              <Grid 
                className={classes.button}
                item 
                component={Button} 
                onClick={() => history.push('/contact')} 
                style={{opacity: value === 2 ? 1 : 0.7}} >
                Contact Us
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction='row'>
              <Grid 
                className={classes.button}
                item 
                component={Button}
                onClick={handleClick} 
                style={{opacity: value === 3 ? 1 : 0.7}} >
                {username ? 'Logout' : 'Login'}
              </Grid>
              {username && 
                <Grid 
                  className={classes.button}
                  item 
                  component={Button}
                  onClick={() => history.push('/profile')}  
                  style={{opacity: value === 4 ? 1 : 0.7}} >
                  Profile
                </Grid>
              }              
            </Grid>
          </Grid>
        </Grid>
      </Hidden>      
      <img
        alt='black decorative slash'
        src={footerAdornment}
        className={classes.adornment}
      />
    </footer>
  );
}