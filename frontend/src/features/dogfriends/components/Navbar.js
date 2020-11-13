import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';
import UserAvatar from './UserAvatar';
import { getUserInfoData, selectUser } from '../dogfriendsUserSlice';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',      
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    // backgroundColor: '#eef0f1fb',
    border: 'none',
    // display: 'flex',
    // alignItems: 'center',
    // flexGrow: 1,
  },
  title: {
    color: 'black',
    textDecoration: 'none',
    border: '1px solid green',
  },
  linkWrapper: {
    display: 'flex',
    border: '1px solid red',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  links: {
    fontSize: '18px',
    margin: '0 40px 0 0',
    color: '#2196f3',
    padding: '0',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  
  const userList = useSelector(selectUser);

  useEffect(() => {
    const usr = auth.authState.userInfo.username;
    const token = auth.authState.token;
    const payload = {
      username: usr,
      token: token
    }
    dispatch(getUserInfoData(payload));
    // eslint-disable-next-line
  }, [dispatch]);

  const handleClick = () => {
    auth.setAuthState({
      token: "",
      userInfo: {}
    });
  }
    
  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Typography variant="h5" className={classes.title} component={Link} to={"/"} >
          <h2>Dog Friends</h2>
        </Typography>
        <div className={classes.linkWrapper}>
          <Button className={classes.links} component={Link} to={"/"} >
            Blog
          </Button> 
          {auth.authState.token !== "" ? <>
            
            <Button className={classes.links} component={Link} to={"/profile"} >
            <UserAvatar />
              {auth.authState.userInfo.username}
            </Button>
            <Button className={classes.links} component={Link} to={"/new"} >
              Add a new post
            </Button>
            <Button className={classes.links} component={Link} to={"/profile"} >
              Profile
            </Button>
            <Button onClick={handleClick} className={classes.links} component={Link} to={"/login"} >
              Log out
            </Button>            
            </> :
            <Button className={classes.links} component={Link} to={"/login"} >
              Login / Signup
            </Button>
          }         
        </div>                
      </Toolbar>
    </AppBar>
  );
}

