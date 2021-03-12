import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useDate from '../hooks/useDate';

const useStyles = makeStyles({
  root: {    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    margin: '1px 12px 1px 3px',
    padding: '2px 5px 2px 5px',       
  },
  mediaBody: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '18px',
    wordWrap: 'break-word',
    overflow: 'hidden',    
  },
  mediaInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px', 
  }
});

export default function ReplyDisplay({username, body, created_on}) {
  const classes = useStyles();
  
  return ( 
    <div className={classes.root}> 
      <div className={classes.mediaBody}>
        {body}
      </div>
      <div className={classes.mediaInfo}>
        <div>By {username}</div>
        <div>{useDate(created_on)}</div>
      </div>
    </div> 
  );
}
