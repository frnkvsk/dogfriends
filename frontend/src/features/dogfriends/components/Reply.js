import React  from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
// import { Box } from '@material-ui/core';
// import {
//   selectMemes,
//   setEditMemeData,
// } from './memesSlice';

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0 20px',
    cursor: 'pointer',
  },
}));

export default function Reply() {
  const classes = useStyles();
  
  // console.log('PostPhoto photo',photo)
  return (  
    <div key={uuid()} className={classes.root} >
      <h1>Reply</h1>        
    </div>    
  );
}
