import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import {getPhotoBySrc} from '../api/DogfriendsPhotosApi';
import ImageComp from './ImageComp';

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
    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    //   minWidth: '300px',
    // },
  },
}));


export default function PostSourceDisplay({post}) {
  const classes = useStyles();
  const {
    body, created_on, id, photo_id, replies, title, username, votes, base_url 
  } = post;
  // const src = `${base_url}/${photo_id}.txt`;
  // console.log('PostSourceDisplay title',title)
  console.log('PostSourceDisplay body',body, created_on, id, photo_id, replies, title, username, votes, base_url)
  // const [urlImage, setUrlImage] = useState(null);

  // useEffect(() => {
  //   setUrlImage(src);
  //   console.log('PostSourceDisplay useEffect setUrlImage',src)
  //   // eslint-disable-next-line
  // }, [src]);

  // const getUrl = async () => {
  //   // console.log('PostSourceDisplay src ',src)
  //   const res = await getPhotoBySrc(src);
  //   if(res && res.data.Body.data) {
  //     const base64 = String.fromCharCode(...res.data.Body.data).toString('base64');
  //     setUrlImage(base64);
  //   }
    
  //   console.log('PostSourceDisplay getUrl url',res.data.Body)
  // }
  // useEffect(() => {
  //   if(!urlImage || !urlImage.startsWith('data:image/jpeg')) {
  //     getUrl();
  //   }
  //   console.log('PostSourceDisplay useEffect urlImage')
  //   // eslint-disable-next-line
  // }, []) 

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={useImageUrl(id)}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            By {username}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>      
    </Card>
  );  
}
