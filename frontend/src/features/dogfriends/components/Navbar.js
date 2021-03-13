import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import { addUserInfo } from '../dogfriendsUserSlice';
import { 
  getUserInfo,
  getInitInfo } from '../api/DogfriendsApi';
import logo from '../assets/logo.png';
import UserAvatar from './UserAvatar';
import { 
  addInitInfo,
  selectInitInfo } from '../dogfriendsInitInfoSlice';

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
    height: '4em',     
    [theme.breakpoints.down('md')]: {
      height: '4.5em',
    },  
  },
  logoContainer: {
    padding: '0',
    backgroundColor: 'transparent',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginRight: '25px',
    
  },
  button: {
    ...theme.typography.button,
    borderRadius: '50px',
    margin: '0 25px 0 50px',    
    height: '45px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    }
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
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
    position: 'fixed',
    background: `linear-gradient(45deg, ${theme.palette.common.brown} 30%, ${theme.palette.common.brownDark} 90%)`,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
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
    threshold: 200
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
export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const selectInitInfoData = useSelector(selectInitInfo);
  const location = useLocation();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);  
  const [openDrawer, setOpenDrawer] = useState(false);
  const [username, setUserName] = useState(''); 
  const [listItems, setListItems] = useState({});

  
  useEffect(() => {
    const getInitInfoData = async () => {
      const response = await getInitInfo();
      if(response.status === 200) {
        dispatch(addInitInfo(response.data));
      }      
    }
    if(selectInitInfoData.status !== 'fulfilled') {
      getInitInfoData();      
    }    
    // eslint-disable-next-line
  }, [])
  /**
   * We are going to check the login status of the user
   * here at the Navbar because it is the top level Component
   * in this app.
   */
  useEffect(() => {
    const getSetUserInfo = async () => {
      const data = {
        username: auth.authState.userInfo.username,
        token: auth.authState.token
      }
      const resp = await getUserInfo(data);
      if(resp.status === 200) {
        dispatch(addUserInfo(resp.data.user))
      }
    }
    // if auth contains the user token, then the 
    // user is signed in.
    if(auth.authState && auth.authState.token.length && !username.length) {
      // set the username
      setUserName(auth.authState.userInfo.username);
      // get and set the user infomation in Redux so the rest of
      // the app has access to this information
      getSetUserInfo();
    } else {
      setUserName('');
    }
    // eslint-disable-next-line
  }, [auth.authState, dispatch]);
  
  // if token not equal to undefined then user is logged in 
  // and has a different set of Navbar options
  useEffect(() => {
    username.length ? setListItems({
      '/': {name: 'Home', index: 0},
      '/new': {name: 'New Post', index: 1},
      '/profile': {name: 'Profile', index: 2},
      '/about': {name: 'About Us', index: 3},
      '/login': {name: 'Logout', index: 4},
    }) : setListItems({
      '/': {name: 'Home', index: 0},
      '/about': {name: 'About Us', index:1},
      '/login': {name: 'Login', index: 2},
    });
  }, [username.length]);
   
  // set the focus on the correct navbar index
  useEffect(() => {
    if(listItems[location.pathname]) {
      if(listItems[location.pathname].index === 4) {
        setValue(0);
      } else {
        setValue(listItems[location.pathname].index);  
      }       
    }          
  }, [listItems, location.pathname]);

  const handleClick = async e => {
    if(auth.authState.userInfo.username) {
      await auth.setAuthState({token: "", userInfo: {}});      
      history.push('/login');
    } else {
      history.push('/login');
    }      
  }
  
  const tabs = (
    <>
    <Tabs 
      className={classes.tabContainer} 
      value={value && !auth.authState.userInfo ? value -2 : value} 
      TabIndicatorProps={{style: {backgroundColor: 'primary', opacity: 0}}}          
      >
        {Object.entries(listItems).map(e => 
          e[0]==='/login' ? (
            <Tab 
              key={e}              
              className={classes.button}
              variant='outlined'
              color='secondary'
              component={Button}
              label={e[1].name}
              onClick={handleClick}
            />
          ) : (
            <Tab 
              key={e}
              className={classes.tab}
              component={Button}
              label={e[1].name}
              onClick={() => history.push(e[0])}             
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
              {username ? (
                <div 
                  className={classes.avatar}
                  onClick={() => history.push('/profile')}>
                  {username}
                  <UserAvatar />
                </div>
              ) : ''} 
            </Toolbar>
          </AppBar>
        </HideOnScroll>            
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>    
  );
}