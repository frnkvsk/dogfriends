import React, { useContext, useEffect, useState } from 'react';
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
  // console.log('UserAvatar userList',userList)
  const [photo_url, setPhotoUrl] = useState(null);

  const auth = useContext(AuthContext);
  const alt = auth.authState.userInfo.username || "";
  console.log('UserAvatar userList',userList)
  useEffect(() => {
    if(userList.status === 'fulfilled') {
      setPhotoUrl(userList.data.user.photo_url);
      console.log('UserAvatar userList.status',userList.status)
    }
    console.log('UserAvatar userList.status',userList.status)
    console.log('UserAvatar userList',userList)
    console.log('UserAvatar photo_url',photo_url)
  }, [userList.status, photo_url, userList])

  console.log('UserAvatar photo_url',photo_url)
  console.log('UserAvatar photo_url',userList)
  // const initials = '';
  const initials = userList.status==='fulfilled' ? userList.data.user.first_name[0].toUpperCase() + userList.data.user.last_name[0].toUpperCase() : '';
  return (
    
    <div className={classes.root}>
      {console.log('UserAvatar return ',photo_url)}
      {photo_url ? 
      <Avatar alt={alt} src={photo_url} />
      :
      <Avatar className={classes.orange}>{initials}</Avatar>        
      }
      
    </div>
  );
}
