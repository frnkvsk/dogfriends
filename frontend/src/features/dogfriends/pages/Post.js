import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { animations } from 'react-animation';
import { makeStyles } from '@material-ui/core';
import PostDisplay from '../components/PostDisplay';
import { selectPosts } from '../dogfriendsPostsSlice';
import RepliesList from '../components/RepliesList';

const useStyles = makeStyles((theme) => ({
  root: {    
    display: 'flex',
    flexDirection: 'column',
    animation: animations.popIn,
    animationDuration: 2500,
  },
  mainContainer: {    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',    
    width: '100%', 
    fontSize: '22px', 
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    }, 
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'stretch',
    },
  },
  
}));

export default function Post() {
  const classes = useStyles();
  let history = useHistory();
  const { parent_id } = useParams();
  const selectList = useSelector(selectPosts);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if(selectList.status === 'fulfilled' && !post) {      
      setPost( selectList.data.find(e => e.id === parent_id) );
    } else if(selectList.status !== 'fulfilled' && !post) {
      history.push('/');
    } 
    // eslint-disable-next-line
  }, [selectList.status, selectList.data, post, parent_id]);  

  return (
    <div className={classes.root}>
      {post ? (
      <div className={classes.mainContainer}>
        <PostDisplay post={post} />
        <RepliesList post={post}/>
      </div> 
      ) : ''} 
    </div>    
  );
}