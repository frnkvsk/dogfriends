import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

import useDate from '../hooks/useDate';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    // minWidth: '400px',
    margin: '1px 0 1px 0',
    // border: '1px solid red',
  },
  media: {
    width: '93%',
    minWidth: '380px',
    padding: '5px 10px 3px 10px',
    margin: '3px 0 3px 0',
    border: '1px solid #eeeeee',
  },
  mediaBody: {
    maxWidth: '350px',
    wordWrap: 'break-word',
    // overflow: 'hidden',
  },
  mediaInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    // width: '100%',    
  }
});

export default function ReplyDisplay({username, body, created_on}) {
  const classes = useStyles();
  
  return ( 
    <div className={classes.root}> 
      <Paper elevation={1} className={classes.media}>
        <Typography className={classes.mediaBody}>
          {body}
        </Typography>
        <Typography className={classes.mediaInfo} variant="subtitle2">
          <div>By {username}</div>
          <div>{useDate(created_on)}</div>
        </Typography>
      </Paper>
    </div> 
  );
}
