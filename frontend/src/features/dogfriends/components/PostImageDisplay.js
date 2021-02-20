import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import {getPhotoBySrc} from '../api/DogfriendsPhotosApi';
// import ImageComp from './ImageComp';
import useImageUrl from '../hooks/useImageUrl';

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


export default function PostImageDisplay({key, title, username}) {
  const classes = useStyles();
  
  console.log('PostImageDisplay src',key)
  // console.log('PostImageDisplay title',title)
  // console.log('PostImageDisplay body',body)
  // const [urlImage, setUrlImage] = useState(src);

  // useEffect(() => {
  //   setUrlImage(src);
  //   console.log('PostImageDisplay useEffect setUrlImage',src)
  //   // eslint-disable-next-line
  // }, [src]);

  // const getUrl = async () => {
  //   console.log('PostImageDisplay src ',src)
  //   const res = await getPhotoBySrc(src);
  //   if(res && res.data) {
  //     setUrlImage(res.data);
  //   }
    
  //   console.log('PostImageDisplay getUrl url',urlImage)
  // }
  // useEffect(() => {
  //   if(!urlImage || !urlImage.startsWith('data:image/jpeg')) {
  //     getUrl();
  //   }
  //   console.log('PostImageDisplay useEffect urlImage')
  //   // eslint-disable-next-line
  // }, []) 

  return (
    <Card className={classes.root}>
      <CardActionArea>
      <ImageComp key={key}/>
        <CardMedia
          className={classes.media}
          image={useImageUrl(key)}
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
