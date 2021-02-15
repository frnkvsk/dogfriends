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


export default function CardImageDisplay({src, title, body}) {
  const classes = useStyles();
  // console.log('CardImageDisplay src',src)
  // console.log('CardImageDisplay title',title)
  // console.log('CardImageDisplay body',body)
  const [urlImage, setUrlImage] = useState(src);

  // useEffect(() => {
  //   setUrlImage(src);
  //   console.log('CardImageDisplay useEffect setUrlImage',src)
  //   // eslint-disable-next-line
  // }, [src]);

  const getUrl = async () => {
    console.log('CardImageDisplay src ',src)
    const res = await getPhotoBySrc(src);
    if(res && res.data) {
      setUrlImage(res.data);
    }
    
    console.log('getUrl url',urlImage)
  }
  useEffect(() => {
    if(!urlImage || !urlImage.startsWith('data:image/jpeg')) {
      getUrl();
    }
    console.log('Home useEffect urlImage', urlImage)
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
