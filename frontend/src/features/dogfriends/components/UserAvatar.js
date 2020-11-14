import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from '../context/AuthContext';
import { deepOrange } from '@material-ui/core/colors';
import { selectUser } from '../dogfriendsUserSlice';
import { useSelector } from 'react-redux';

// import { getUserInfoData, selectUser } from '../dogfriendsUserSlice';
// import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    marginRight: '40px',
  },
}));

export default function UserAvatar() {
  const classes = useStyles();
  const userList = useSelector(selectUser);
  // const userList = useSelector(selectUser);
  console.log('UserAvatar userList',userList)

  const auth = useContext(AuthContext);
  const alt = auth.authState.userInfo.username || "";

  let src = "";
  if(userList.status === 'fulfilled') {
    src = userList.data.user.photo_url;
  }
  const initials = 'TT'//(auth.authState.userInfo.first_name[0] + auth.authState.userInfo.last_name[0]).toUpperCase();
  // console.log('UserAvatar auth.authState.userInfo',auth.authState.userInfo)
  return (
    <div className={classes.root}>
      {src === "" ? 
        <Avatar className={classes.orange}>{initials}</Avatar>
        :
        <Avatar alt={alt} src={src} />
      }
      
    </div>
  );
}
