import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// import {getPhotoBySrc} from '../api/DogfriendsPhotosApi';
// import ImageComp from './ImageComp';
import useImageUrl from '../hooks/useImageUrl';
import useDate from '../hooks/useDate';

const useStyles = makeStyles({
  root: {
    maxWidth: '250px',
    padding: '15px',
    margin: '15px',
  },
  media: {
    maxWidth: '250px',
    width: '18em',
    height: '18em'
    // height: 140,
  },
});


export default function Post({id, title, username, created_on}) {
  const classes = useStyles();
  const urlImage = useImageUrl(id);

  return (
    <Card className={classes.root}>

      <CardActionArea>
        {urlImage ? (
          <CardMedia
            className={classes.media}
            image={urlImage}
            title={title} />
        ) : <CircularProgress />}
        
        <CardContent>
          <Typography gutterBottom variant='h5'>
            {title}
          </Typography>
          <Typography gutterBottom variant='subtitle1'>
            By {username}
          </Typography>
          <Typography gutterBottom variant='subtitle2'>
            {useDate(created_on)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Explore Post
        </Button>
      </CardActions>
    </Card>
  );  
}
