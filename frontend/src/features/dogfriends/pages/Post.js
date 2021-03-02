import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { animations } from 'react-animation';
import { makeStyles } from '@material-ui/core';

import PostDisplay from '../components/PostDisplay';
import { 
  selectPosts, 
} from '../dogfriendsPostsSlice';
import RepliesList from '../components/RepliesList';

const useStyles = makeStyles((theme) => ({
  root: {    
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',    
    // width: '70%', 
    // fontSize: '22px',
    // padding: '7px',    
    // [theme.breakpoints.down('md')]: {
    //   flexDirection: 'row',
    //   width: '85%',
    // }, 
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column',
    //   alignItems: 'stretch',
    //   justifyContent: 'stretch',
    //   // alignItems: 'center',
    //   width: '90%',
    // },
    // border: '1px solid blue'
    animation: animations.popIn,
    animationDuration: 2500,
  },
  mainContainer: {    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-around',    
    width: '100%', 
    fontSize: '22px',
    // padding: '7px',    
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      // width: '85%',
    }, 
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      // alignItems: 'center',
      // width: '90%',
    },
    // border: '1px solid red'
  },
  // replies: {
  //   [theme.breakpoints.up('lg')]: {
  //     width: '70%'
  //   },
  //   [theme.breakpoints.down('lg')]: {
  //     width: '85%'
  //   },
  //   [theme.breakpoints.up('xl')]: {
  //     width: '100%'
  //   },
  // }
  
}));

export default function Post() {
  const classes = useStyles();
  let history = useHistory();
  const { parent_id } = useParams();
  const selectList = useSelector(selectPosts);
  // const dispatch = useDispatch();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if(selectList.status === 'fulfilled' && !post) {      
      setPost( selectList.data.find(e => e.id === parent_id) );
    } else if(selectList.status !== 'fulfilled' && !post) {
      history.push('/');
    } 
    // console.log('Post useEffect post',post, selectList, parent_id)
    // eslint-disable-next-line
  }, [selectList.status, selectList.data, post, parent_id]);  

  // console.log('Postpage post',post, parent_id)
  return (
    <div className={classes.root}>
      {post ? (
      <div className={classes.mainContainer}>
        <PostDisplay post={post} />
        {/* <div className={classes.replies}> */}
          <RepliesList post={post}/>
        {/* </div>     */}
      </div> 
      ) : ''} 
    </div>
    
  );
}