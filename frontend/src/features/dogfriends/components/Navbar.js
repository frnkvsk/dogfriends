import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button';

import { AuthContext } from '../context/AuthContext';
import UserAvatar from './UserAvatar';
import { getUserInfoSlice } from '../dogfriendsUserSlice';
import { logout } from '../dogfriendsUserSlice';

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '4em'
  },
  logo: {
    height: '8em',    
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
    borderRadius: '50px',
    margin: '0 25px 0 50px',    
    height: '45px',
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
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const location = useLocation();
  
  useEffect(() => {
    if(auth.authState.userInfo.username) {
      const usr = auth.authState.userInfo.username;
      const token = auth.authState.token;
      const payload = {
        username: usr,
        token: token
      }
      
      dispatch(getUserInfoSlice(payload));
    }
    
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    switch(location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/profile':
        setValue(1);
        break;
      case '/new':
        setValue(2);
        break;
      case '/login':
        setValue(3);
        break;
      default:
        setValue(4);
    }  
    console.log('Header useEffect value',value)  
  }, [value, location.pathname]);

  const handleClick = () => {
    auth.setAuthState({
      token: "",
      userInfo: {}
    });
    dispatch(logout({
      status: 'idle',
      data: {},
      error: {}
    }));
  }

  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed'>
          <Toolbar disableGutters>
            <Button className={classes.logoContainer} component={Link} to='/' disableRipple>
              {/* <img src={logo} className={classes.logo} alt='company logo'/> */}
              <h2>Dog Friends</h2>
            </Button>            
            <Tabs 
              className={classes.tabContainer} 
              value={value}               
              indicatorColor='primary'>
              <Tab className={classes.tab} label='Home' component={Link} to='/' />
              {auth.authState.token !== "" && <>
                <Tab className={classes.tab} component={Link} to='/profile'>
                  <UserAvatar />
                  {auth.authState.userInfo.username}
                </Tab>
                <Tab className={classes.tab} label='Add a new post' component={Link} to='/new' />
                <Tab className={classes.tab} label='Profile' component={Link} to='/profile' />
              </>
              }
              <Tab className={classes.tab} label='About Us' component={Link} to='/about' />
              <Tab className={classes.tab} label='Contact Us' component={Link} to='/contact' />
            </Tabs>
            {auth.authState.token !== "" ?
              <Button className={classes.button} variant='contained' color='secondary' component={Link} to='/' onClick={handleClick} >
                Logout
              </Button> :
              <Button className={classes.button} variant='contained' color='secondary' component={Link} to='/login' >
                Login
              </Button>
            }
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
    
  );
}

// import React, { useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { Button } from '@material-ui/core';

// import { AuthContext } from '../context/AuthContext';
// import UserAvatar from './UserAvatar';
// import { getUserInfoSlice } from '../dogfriendsUserSlice';
// import { logout } from '../dogfriendsUserSlice';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     // flexDirection: 'column',    
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',      
//     },
//     [theme.breakpoints.up('md')]: {
//       flexDirection: 'row',
//       alignItems: 'flex-start',
//       justifyContent: 'space-between',
//     },
//     // backgroundColor: '#eef0f1fb',
//     border: 'none',
//     // display: 'flex',
//     // alignItems: 'center',
//     // flexGrow: 1,
//   },
//   title: {
//     color: 'black',
//     textDecoration: 'none',
//     // border: '1px solid green',
//   },
//   linkWrapper: {
//     display: 'flex',
//     // border: '1px solid red',
//     fontWeight: 'bold',
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//       alignItems: 'center',
//       width: '100%',
//     },
//     [theme.breakpoints.up('md')]: {
//       flexDirection: 'row',
//     },
//   },
//   links: {
//     fontSize: '18px',
//     margin: '0 40px 0 0',
//     color: 'white',
//     padding: '0',
//   },
// }));

// export default function Navbar() {
//   const classes = useStyles();
//   const auth = useContext(AuthContext);
//   const dispatch = useDispatch();
  
//   // const userList = useSelector(selectUser);

//   useEffect(() => {
//     if(auth.authState.userInfo.username) {
//       const usr = auth.authState.userInfo.username;
//       const token = auth.authState.token;
//       const payload = {
//         username: usr,
//         token: token
//       }
      
//       dispatch(getUserInfoSlice(payload));
//     }
    
//     // eslint-disable-next-line
//   }, [dispatch]);

//   const handleClick = () => {
//     auth.setAuthState({
//       token: "",
//       userInfo: {}
//     });
//     dispatch(logout({
//       status: 'idle',
//       data: {},
//       error: {}
//     }));
//   }
    
//   return (
//     <AppBar position="static">
//       <Toolbar className={classes.root}>
//         <Typography variant="h5" className={classes.title} component={Link} to={"/"} >
//           <h2>Dog Friends</h2>
//         </Typography>
//         <div className={classes.linkWrapper}>
//           <Button className={classes.links} component={Link} to={"/"} >
//             Blog
//           </Button> 
//           {auth.authState.token !== "" ? <>
            
//             <Button className={classes.links} component={Link} to={"/profile"} >
//             <UserAvatar />
//               {auth.authState.userInfo.username}
//             </Button>
//             <Button className={classes.links} component={Link} to={"/new"} >
//               Add a new post
//             </Button>
//             <Button className={classes.links} component={Link} to={"/profile"} >
//               Profile
//             </Button>
//             <Button onClick={handleClick} className={classes.links} component={Link} to={"/login"} >
//               Log out
//             </Button>            
//             </> :
//             <Button className={classes.links} component={Link} to={"/login"} >
//               Login / Signup
//             </Button>
//           }         
//         </div>                
//       </Toolbar>
//     </AppBar>
//   );
// }

