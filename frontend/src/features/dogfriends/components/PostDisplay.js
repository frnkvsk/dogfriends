import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import useImageUrl from '../hooks/useImageUrl';
import useDate from '../hooks/useDate';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    border: '2px solid #eeeeee',
    borderRadius: 6,
    boxShadow: '0 10px 6px -6px #80808040',
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
      borderBottom: 'none',
      borderBottomLeftRadius: 'none',
      borderBottomRightRadius: 'none',
      marginRight: '0',
    }
  },
  media: { 
    borderTopRightRadius: 6, 
    borderTopLeftRadius: 6, 
  },
  mediaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    width: '100%',     
  },
  mediaBody: {
    maxWidth: '90%',
    wordWrap: 'break-word',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '95%',
    padding: '7px',
  }
}));


export default function PostDisplay(post) {
  const {body, photo_id, title, username, created_on} = post.post;
  const classes = useStyles();
  const urlImage = useImageUrl(photo_id+'.txt');
  return (
    <div className={classes.root}>
      {urlImage ? <img src={urlImage} alt='title' className={classes.media} />
        : <CircularProgress />}      
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
        <Typography className={classes.mediaBody}>
          {body}
        </Typography>
        <Typography className={classes.mediaItem} variant="subtitle2">
          <div>By {username}</div>
          <div>{useDate(created_on)}</div>
        </Typography>
      </CardContent>
    </div>
  );  
}
