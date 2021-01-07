import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  useHistory,
  useLocation 
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Hidden,
  Button,
  useScrollTrigger,
  Slide,
} from '@material-ui/core';

import { AuthContext } from '../context/AuthContext';

import footerAdornment from '../assets/footerLogo.png';

const useStyles = makeStyles(theme => ({
  footer: {
    background: `linear-gradient(45deg, ${theme.palette.common.brown} 30%, ${theme.palette.common.brownLight} 90%)`,
    width: '100%',
    // zIndex: 1302,
    // position: 'relative',
    // left: 0,
    // bottom: 0,
    // marginTop: '10px',
    position: 'fixed',
    top: 'auto',
    bottom: 0,
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

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ 
    threshold: 250
  });
  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
};

export default function Footer(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const username = auth.authState.userInfo.username;
  const [value, setValue] = useState(0);   

  useEffect(() => {
    const listItems = {
      '/': {name: 'Home', index: 0},
      '/about': {name: 'About Us', index: 1},
      '/contact': {name: 'Contact Us', index: 2},
      '/login': {name: 'Logout', index: 3},
      '/profile': {name: 'Profile', index: 4},
      '/new': {name: 'New', index: 5}    
    }
    setValue(listItems[location.pathname].index);
  }, [location.pathname]);

  const handleClick = async e => {
    if(!username) {
      history.push('/login');
    } else {
      await auth.setAuthState({token: "", userInfo: {}});
      history.push('/login');
    }    
  }

  return (
    <HideOnScroll {...props}>
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
    </HideOnScroll>
    
  );
}