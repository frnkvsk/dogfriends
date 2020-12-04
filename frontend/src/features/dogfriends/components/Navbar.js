import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Tab,
  Tabs,
  Button,
  useScrollTrigger,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem, 
  ListItemText
} from '@material-ui/core';

// import Toolbar from '@material-ui/core/Toolbar';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import Tabs from '@material-ui/core/Tabs'
// import Tab from '@material-ui/core/Tab'
// import Button from '@material-ui/core/Button';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';


import { AuthContext } from '../context/AuthContext';
// import UserAvatar from './UserAvatar';
// import { getUserInfoSlice } from '../dogfriendsUserSlice';
// import { logout } from '../dogfriendsUserSlice';


import logo from '../assets/logo.png';

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '4em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2.7em',
    }, 
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.6em',
    }, 
  },
  logo: {
    height: '8em', 
    [theme.breakpoints.down('md')]: {
      height: '7em',
    }, 
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    },   
  },
  logoContainer: {
    padding: '0'
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px'
  },
  button: {
    ...theme.typography.button,
    backgroundColor: theme.palette.common.yellow,
    borderRadius: '50px',
    margin: '0 25px 0 50px',    
    height: '45px',
  },
  drawer: {
    backgroundColor: theme.palette.common.brown,
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  drawerIcon: {
    fontSize: '2em',
    borderRadius: '15px',
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerItemLogin: {
    backgroundColor: theme.palette.common.yellow,
  },
  drawerItemSelected: {
    opacity: 1,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
}));


function ElevationScroll(props) {
  const { children } = props;
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  console.log('Navbar auth',auth)
//   const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = useState(0);  
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if(auth.authState.userInfo.username) {
      switch(location.pathname) {        
        case '/new':
          setValue(1);
          break;
        case '/profile':
          setValue(2);
          break;
        case '/about':
          setValue(3);
          break;
        case '/contact':
          setValue(4);
          break
        case '/login':
          setValue(5);
          break; 
        default:
          setValue(0);
      } 
      console.log('Navbar if switch value',value) 
    } else {
      switch(location.pathname) {        
        case '/about':
          setValue(1);
          break;
        case '/contact':
          setValue(2);
          break;
        case '/login':
          setValue(3);
          break;        
        default:
          setValue(0);
      }  
      console.log('Navbar else switch value',value)
    }
    
    console.log('Header useEffect value',value)  
  }, [value, location.pathname, auth.authState.userInfo.username]);

  const handleClick = async e => {
    if(!auth.authState.userInfo.username) {
      history.push('/login');
    } else {
      await auth.setAuthState({token: "", userInfo: {}});
    }    
  }

  const tabs = (
    <>
    <Tabs 
      className={classes.tabContainer} 
      value={value && !auth.authState.userInfo ? value -2 : value}               
      indicatorColor='primary'>
      <Tab 
        className={classes.tab} 
        label='Home' 
        component={Link} 
        to='/' />
      {auth.authState.userInfo.username &&
        <Tab 
          className={classes.tab} 
          label='New Post' 
          component={Link} 
          to='/new' />}
      {auth.authState.userInfo.username &&
          <Tab 
            className={classes.tab} 
            label='Profile' 
            component={Link} 
            to='/profile' />}
      <Tab 
        className={classes.tab} 
        label='About Us' 
        component={Link} 
        to='/about' />
      <Tab 
        className={classes.tab} 
        label='Contact Us' 
        component={Link} 
        to='/contact' />
      <Tab 
        className={classes.button} 
        label={auth.authState.userInfo.username ? 'Logout' : 'Login'}
        onClick={handleClick} 
        component={Button} />
    </Tabs>
    {/* <Button 
      className={classes.button} 
      variant='contained' 
      color='secondary'
      onClick={handleLogout} 
      component={Link} 
      to='/login' >
    {auth.authState.userInfo.username ? 'Logout' : 'Login'}
    </Button> */}
    
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer 
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)} 
        classes={{paper: classes.drawer}}>
        <List onClick={() => setOpenDrawer(false)} className={classes.list}>
          <ListItem divider button component={Link} to='/' selected={value === 0}>
            <ListItemText className={classes.drawerItem} disableTypography>Home</ListItemText>
          </ListItem>        
          {auth.authState.userInfo.username &&
          <ListItem  divider button component={Link} to='/new' selected={value === 1}>
            <ListItemText className={classes.drawerItem} disableTypography>New Post</ListItemText>
          </ListItem>}
          {auth.authState.userInfo.username &&
          <ListItem  divider button component={Link} to='/profile' selected={value === 2}>
            <ListItemText className={classes.drawerItem} disableTypography>Profile</ListItemText>
          </ListItem>}
          <ListItem  divider button component={Link} to='/about' selected={value === 3}>
            <ListItemText className={classes.drawerItem} disableTypography>About Us</ListItemText>
          </ListItem>
          <ListItem  divider button component={Link} to='/contact' selected={value === 4}>
            <ListItemText className={classes.drawerItem} disableTypography>Contact Us</ListItemText>
          </ListItem>
          <ListItem className={classes.drawerItemLogin} divider button component={Link} to='/login' selected={value === 5}>
            <ListItemText className={classes.drawerItem} disableTypography>
              {auth.authState.userInfo.username ? 'Logout' : 'Login'}
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton 
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed'>
          <Toolbar disableGutters>
            <Button className={classes.logoContainer} component={Link} to='/' disableRipple>
              <img src={logo} className={classes.logo} alt='company logo'/>
            </Button>            
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
    
  );
}
