import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useDate from '../hooks/useDate';

const useStyles = makeStyles({
  root: {
    width: '100%',

  },
  media: {
    width: '100%',
    // height: 140,
  },
  cardContent: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    width: '100%',
    border: '1px solid red',
  }
});

export default function ReplyDisplay({username, body, created_on}) {
  const classes = useStyles();
  // const months = [,'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'];
  // const [yr,mo,da] = created_on.slice(0,10).split('-')
  // console.log(months[+mo],mo,da,yr, created_on)
  // // console.log('PostPhoto photo',photo)
  return (  
    <Card className={classes.root}>

      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='subtitle1'>
            {body}
          </Typography>
          <Typography gutterBottom variant='subtitle1'>
            By {username}
          </Typography>
          <Typography gutterBottom variant='subtitle2'>
            {useDate(created_on)}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>  
  );
}
