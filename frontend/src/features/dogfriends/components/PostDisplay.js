import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import useImageUrl from '../hooks/useImageUrl';
import useDate from '../hooks/useDate';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '400px',
    padding: '15px',
    // margin: '15px',
    // border: '2px solid pink',
  },
  media: {    
    height: '400px',
    
    minWidth: '400px',
    width: '400px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      minWidth: '300px',
    },     
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
}));


export default function PostDisplay({post}) {
  const classes = useStyles();
  
  const {
    body, photo_id, title, username, created_on 
  } = post;
  const urlImage = useImageUrl(photo_id+'.txt')

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {urlImage ? (
          <CardMedia
            className={classes.media}
            image={urlImage}
            title={title} />
        ) : <CircularProgress />}        
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
      </CardActionArea>      
    </Card>
  );  
}
