import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import useDate from '../hooks/useDate';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';
import { addPhotoUrl, selectPhotos } from '../dogfriendsPhotosSlice';
import { selectInitInfo } from '../dogfriendsInitInfoSlice';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center', 
    maxWidth: '350px',
    margin: '15px',
    border: '2px solid #f5f5f5',
    borderRadius: '4px',
    boxShadow: '0 10px 6px -6px #80808040',
    cursor: 'pointer',
  },
  mediaWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  media: {    
    maxWidth: '350px',
    maxHeight: '350px',
    objectFit: 'contain',
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
  const selectInitInfoData = useSelector(selectInitInfo);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    let isSubscribed = true;
    
    async function getImage(isSubscribed) {   
      if(isSubscribed) {
        const existingPost = [...selectPhotosList.data].find(post => id.startsWith(post.photo_id));
        if(selectPhotosList.status === 'fulfilled' && existingPost) {
          if(isSubscribed){
            setImageUrl(existingPost.imageUrl);
          }
        } else if(selectInitInfoData.data.aws_bucket_endpoint_down !== undefined) {
          try {
            // const getSource = () => getPhotoBySrc(id, selectInitInfoData.data.aws_bucket_endpoint_down)
            // .then(res => {
            //   const imageUrl = String.fromCharCode(...res.data.Body.data).toString('base64');            
            //   const payload = {
            //     photo_id: id,
            //     imageUrl
            //   }
            //   if(isSubscribed){
            //     setImageUrl(imageUrl); 
            //     dispatch(addPhotoUrl(payload));      
            //   }
            // });
            // setTimeout(() => {
            //   getSource();
            // });
            const getSource = async () => {
              let res = await getPhotoBySrc(id, selectInitInfoData.data.aws_bucket_endpoint_down);
              if(res.status === 200 && res.data.Body) {
                const imageUrl = String.fromCharCode(...res.data.Body.data).toString('base64');            
                let payload = {
                  photo_id: id,
                  imageUrl
                }
                if(isSubscribed){
                  setImageUrl(imageUrl); 
                  dispatch(addPhotoUrl(payload));      
                }              
              }
            } 
            setTimeout(() => {
              getSource();
            }, 100);
            
          } catch (error) {
            console.error(error);
          }
          
        }
        return () => isSubscribed = false;
      }                   
    }; 
    if(isSubscribed && !imageUrl.length && id) {
      getImage(isSubscribed);  
    }
    return () => isSubscribed = false;
    // eslint-disable-next-line
  }, [imageUrl.length, selectPhotosList.status]);
  
  return (
    <div className={classes.root}>
      <div className={classes.mediaWrapper}>
        {imageUrl.length ? (
          <img src={imageUrl} alt='title' className={classes.media} />
        ) : (
          <CircularProgress />
        )}
      </div>      
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
