import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from '../context/AuthContext';
import { deepOrange } from '@material-ui/core/colors';

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
  const auth = useContext(AuthContext);
  const alt = auth.authState.userInfo.username || "";
  const src = auth.authState.userInfo.photo_url || "";
  const initials = (auth.authState.userInfo.first_name[0] + auth.authState.userInfo.last_name[0]).toUpperCase();
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
