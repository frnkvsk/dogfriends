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
    position: 'sticky',
    bottom: 0,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  adornment: {
    width: '10.2em',
    verticalAlign: 'bottom',
    [theme.breakpoints.down('md')]: {
      width: '5em',
    },
    height: '2.5rem',
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
    height: '1rem',
  },
  gridItem: {
    margin: '1em',
  },

}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ 
    threshold: 25
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
      '/profile': {name: 'Profile', index: 2},
      '/login': {name: 'Logout', index: 3},      
      '/new': {name: 'New', index: 4}    
    }
    if(!location.pathname.startsWith('/post')) {
      setValue(listItems[location.pathname].index);
    }    
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
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction='row'>
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
              <Grid 
                className={classes.button}
                item 
                component={Button}
                onClick={handleClick} 
                style={{opacity: value === 3 ? 1 : 0.7}} >
                {username ? 'Logout' : 'Login'}
              </Grid>
                            
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