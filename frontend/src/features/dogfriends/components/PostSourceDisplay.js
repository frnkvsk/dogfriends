import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useImageUrl from '../hooks/useImageUrl';
import useDate from '../hooks/useDate';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '400px',
    padding: '15px',
    margin: '15px',
  },
  media: {    
    height: '400px',
    border: '1px solid red',
    minWidth: '400px',
    width: '400px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      minWidth: '300px',
    },     
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  }
}));


export default function PostSourceDisplay({post}) {
  const classes = useStyles();
  const {
    body, photo_id, title, username, created_on 
  } = post;
  return (
    <Card className={classes.root}>
      <p>Post Source Display</p>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={useImageUrl(photo_id+'.txt')}
          title={title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            By {username}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {body}
          </Typography>
          <Typography gutterBottom variant='subtitle2'>
            {useDate(created_on)}
          </Typography>
        </CardContent>
      </CardActionArea>      
    </Card>
  );  
}
