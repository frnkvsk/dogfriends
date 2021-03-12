import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { addAvatarUrl, selectAvatar } from '../dogfriendsAvatarSlice';
import { selectUser } from '../dogfriendsUserSlice';
import { selectInitInfo } from '../dogfriendsInitInfoSlice';
import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';

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
  avatar: {   
    width: theme.spacing(6),
    height: theme.spacing(6),
  }
}));

export default function UserAvatar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectAvatarData = useSelector(selectAvatar);
  const selectUserInfo = useSelector(selectUser);
  const selectInitInfoData = useSelector(selectInitInfo);
  const [photo_url, setPhotoUrl] = useState(selectAvatarData.data ? selectAvatarData.data.imageUrl : null);
  
  useEffect(() => {    
    const getAvatarData = async () => {
      if(selectUserInfo.status === 'fulfilled' && !photo_url && selectUserInfo.data.photo_id) {
        const photo_id = selectUserInfo.data.photo_id;
        const bucket_endpoint = selectInitInfoData.data.aws_bucket_endpoint_down;
        const res = await getPhotoBySrc(photo_id, bucket_endpoint);
        if(res && res.data.Body) {
          const base64 = String.fromCharCode(...res.data.Body.data).toString('base64');
          setPhotoUrl(base64);
          let payload = {
            photo_id,
            imageUrl: base64
          }
          dispatch(addAvatarUrl(payload));            
        }  
      }      
    }
    getAvatarData();
  });

  useEffect(() => {
    setPhotoUrl(selectAvatarData.data.imageUrl);
  }, [selectAvatarData.data.imageUrl])
  
  const initials = selectUserInfo.status==='fulfilled' ? selectUserInfo.data.first_name[0].toUpperCase() + selectUserInfo.data.last_name[0].toUpperCase() : '';

  return (    
    <div className={classes.root}>
      <Avatar alt={initials} src={photo_url} className={classes.avatar} />      
    </div>
  );
}
