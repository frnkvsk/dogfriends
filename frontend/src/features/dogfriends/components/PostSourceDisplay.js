import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {getPhotoBySrc} from '../api/DogfriendsPhotosApi';

const useStyles = makeStyles({
  root: {
    maxWidth: '400px',
    padding: '15px',
    margin: '15px',
  },
  media: {
    width: '400px',
    height: '400px',
    border: '1px solid red',
    // height: 140,
  },
});


export default function PostSourceDisplay({post}) {
  const classes = useStyles();
  const {
    body, created_on, id, photo_id, replies, title, username, votes, base_url 
  } = post;
  const src = `${base_url}/${photo_id}.txt`;
  // console.log('PostSourceDisplay title',title)
  // console.log('PostSourceDisplay body',body, created_on, id, photo_id, replies, title, username, votes, base_url)
  const [urlImage, setUrlImage] = useState(null);

  // useEffect(() => {
  //   setUrlImage(src);
  //   console.log('PostSourceDisplay useEffect setUrlImage',src)
  //   // eslint-disable-next-line
  // }, [src]);

  const getUrl = async () => {
    // console.log('PostSourceDisplay src ',src)
    const res = await getPhotoBySrc(src);
    if(res && res.data) {
      setUrlImage(res.data);
    }
    
    // console.log('PostSourceDisplay getUrl url',urlImage)
  }
  useEffect(() => {
    if(!urlImage || !urlImage.startsWith('data:image/jpeg')) {
      getUrl();
    }
    console.log('PostSourceDisplay useEffect urlImage')
    // eslint-disable-next-line
  }, []) 

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={urlImage ? urlImage : ''}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            By {username}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Explore Post
        </Button>
      </CardActions>
    </Card>
  );  
}
