import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import {getPhotoBySrc} from '../api/DogfriendsPhotosApi';
// import ImageComp from './ImageComp';
// import useImageUrl from '../hooks/useImageUrl';
import useDate from '../hooks/useDate';
// import ImageComp from './ImageComp';

import { useSelector, useDispatch } from 'react-redux';
import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';
import { addPhotoUrl, selectPhotos } from '../dogfriendsPhotosSlice';
import { selectUser } from '../dogfriendsUserSlice';

const useStyles = makeStyles({
  // root: {
  //   maxWidth: '250px',
  //   padding: '15px',
  //   margin: '15px',
  // },
  // media: {
  //   maxWidth: '250px',
  //   width: '18em',
  //   height: '18em'
  //   // height: 140,
  // },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center', 
    maxWidth: '420px',
    // padding: '15px',
    margin: '15px',
    border: '2px solid #f5f5f5',
    borderRadius: '4px',
    boxShadow: '0 10px 6px -6px #80808040',
    cursor: 'pointer',
  },
  media: {    
    // width: '400px',
    // height: '400px',
    
    // minWidth: '420px',
    // width: '420px',
    // [theme.breakpoints.down('md')]: {
    //   width: '100%',
    //   minWidth: '300px',
    // },  
    // border: '1px solid blue',  
    borderTopRightRadius: '4px', 
    borderTopLeftRadius: '4px', 
    
  },
  mediaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    width: '90%',    
  },
  mediaBody: {
    maxWidth: '90%',
    wordWrap: 'break-word',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  }
});


export default function Post({id, title, username, created_on}) {
  const classes = useStyles();
  const selectPhotosList = useSelector(selectPhotos);
  const selectUserInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  // if(!id.endsWith('.txt')) {
  //   id += '.txt';
  // }
  const [imageUrl, setImageUrl] = useState('');
  
  // console.log('Post selectUserInfo', selectUserInfo)
  // console.log('Post selectPhotosList', selectPhotosList)
  // console.log('---------------------')

  useEffect(() => {
    async function getImage() { 
      if(id) {
        const existingPost = [...selectPhotosList.data].find(post => id.startsWith(post.photo_id));
        // console.log('0Post existingPost',existingPost)
        if( selectPhotosList.status === 'fulfilled' && 
          existingPost) {

          // console.log('Post existingPost',existingPost)
          setImageUrl(existingPost.imageUrl);
        } else {
          const res = await getPhotoBySrc(id, selectUserInfo.data.aws_bucket_endpoint_down);
          if(res && res.data.Body) {
            const imageUrl = String.fromCharCode(...res.data.Body.data).toString('base64');
            setImageUrl(imageUrl); 
            let payload = {
              photo_id: id,
              imageUrl
            }
            dispatch(addPhotoUrl(payload));        
          }
        }
      }     
    };
    if(!imageUrl.length) {
      getImage();    
    }
    // eslint-disable-next-line
  }, [imageUrl]);

  return (
    <div className={classes.root}>
      <img src={imageUrl} alt='title' className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
        <Typography className={classes.mediaItem} variant="subtitle2">
          <div>By {username}</div>
          <div>{useDate(created_on)}</div>
        </Typography>
      </CardContent>
    </div>
  );  
}
