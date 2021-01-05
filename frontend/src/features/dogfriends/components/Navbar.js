import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
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
  ListItemText,
  Slide,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    }
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
    // opacity: 1,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
    position: 'fixed'
  }
}));

function ElevationScroll(props) {
  const { children } = props;  
  const trigger = useScrollTrigger({
    threshold: 0
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ 
    threshold: 250
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
};
export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  // console.log('Navbar auth',auth)
//   const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = useState(0);  
  const [openDrawer, setOpenDrawer] = useState(false);

  const username = auth.authState.userInfo.username;
  const [listItems, setListItems] = useState({});
  
  // if username not equal to undefined then user is logged in 
  // and has a different set of Navbar options
  useEffect(() => {
    username ? setListItems({
      '/': {name: 'Home', index: 0},
      '/new': {name: 'New Post', index: 1},
      '/profile': {name: 'Profile', index: 2},
      '/about': {name: 'About Us', index: username !== undefined ? 3 : 1},
      '/contact': {name: 'Contact Us', index: username ? 4 : 2},
      '/login': {name: 'Logout', index: username ? 5 : 3},
    }) : setListItems({
      '/': {name: 'Home', index: 0},
      '/about': {name: 'About Us', index:1},
      '/contact': {name: 'Contact Us', index: 2},
      '/login': {name: 'Login', index: 3},
    });
  }, [username]);
   

  useEffect(() => {
    if(listItems[location.pathname]) {
      setValue(listItems[location.pathname].index);   
    }       
  }, [listItems, location.pathname]);

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
        {Object.entries(listItems).map(e => 
          e[0]==='/login' ? (
            <Tab 
              key={e}
              className={classes.button}
              component={Button}
              label={e[1].name}
              to={e[0]}
              onClick={handleClick}
            />
          ) : (
            <Tab 
              key={e}
              className={classes.tab}
              component={Link}
              label={e[1].name}
              to={e[0]}
            />
          )          
        )}      
    </Tabs>    
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
          <div className={classes.toolbarMargin} />
        <List onClick={() => setOpenDrawer(false)} className={classes.list}>
          {Object.entries(listItems).map((e,i) => 
            e[0]==='/login' ? (
              <ListItem 
                key={e}
                className={classes.drawerItemLogin}
                divider 
                button 
                component={Link} 
                to={e[0]} 
                selected={value === i}>
                <ListItemText className={classes.drawerItem} disableTypography>{e[1].name}</ListItemText>
              </ListItem>
            ) : (
              <ListItem 
                key={e}
                divider 
                button 
                component={Link} 
                to={e[0]} 
                selected={value === i}>
                <ListItemText className={classes.drawerItem} disableTypography>{e[1].name}</ListItemText>
              </ListItem>
            )          
          )}          
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
        <HideOnScroll {...props}>
          <AppBar className={classes.appBar}>
            <Toolbar disableGutters>
              <Button className={classes.logoContainer} component={Link} to='/' disableRipple>
                <img src={logo} className={classes.logo} alt='company logo'/>
              </Button>            
              {matches ? drawer : tabs}
            </Toolbar>
          </AppBar>
        </HideOnScroll>            
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>    
  );
}
