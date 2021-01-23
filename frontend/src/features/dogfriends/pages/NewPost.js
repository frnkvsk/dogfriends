import React from 'react';
import { makeStyles } from '@material-ui/core';
import NewPostForm from './../components/NewPostForm';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',    
  },
  display: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '30px',
  },
}));

export default function NewPost() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* New Post Page */}
      <NewPostForm />
    </div>
  );
}