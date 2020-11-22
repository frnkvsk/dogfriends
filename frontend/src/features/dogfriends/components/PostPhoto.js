import React  from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import { Box } from '@material-ui/core';
// import {
//   selectMemes,
//   setEditMemeData,
// } from './memesSlice';

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '400px',
    margin: '0 20px',
    cursor: 'pointer',
  },
  box: {
    position: 'relative',
    width: '100%',
  },
  labelTop: {
    position: 'relative',
    width: '100%',
    top: '80px',
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
  },
  labelBottom: {
    position: 'relative',
    width: '100%',
    bottom: '80px',
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
  },
}));

export default function PostPhoto({photo}) {
  const classes = useStyles();
  
  console.log('PostPhoto photo',photo)
  return (  
    <div key={uuid()} className={classes.root} >
      <Box className={classes.box}>          
        <div className={classes.labelTop} style={{color: photo.textColor}}>
          <label >{photo.top}</label>
        </div>
        <img className={classes.box} src={photo.url} alt='postphoto' />
        <div className={classes.labelBottom} style={{color: photo.textColor}} >
          <label >{photo.bottom}</label>
        </div>      
      </Box>        
    </div>    
  );
}
