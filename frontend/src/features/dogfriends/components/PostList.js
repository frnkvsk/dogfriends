import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fadeInUp from 'react-animations/lib/fade-in-up';

import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core';
import styled, { keyframes } from 'styled-components';
import Post from './Post';
import { selectPosts, addPosts } from '../dogfriendsPostsSlice';
import { getPosts } from '../api/DogfriendsApi';
import {  selectPageCount } from '../dogfriendsPageCountSlice';
import PaginationComp from './Pagination';

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpAnimation = styled.div`
  animation: 0.8s ${fadeInUpAnimation};
`;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '60vh',
  },
  media: {
    display: 'flex', 
    justifyContent: 'center',   
    flexWrap: 'wrap',
  },
  fadeinContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

const PostList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const posts_per_page = 3;
  const selectPostsData = useSelector(selectPosts);
  const { pageCurr } = useSelector(selectPageCount);
  const [currentPages, setCurrentPages] = useState({
    from: pageCurr * posts_per_page,
    to: pageCurr * posts_per_page + posts_per_page,
  });

  useEffect(() => {
    const getPostsData = async (isSubscribed) => {
      // gets all posts from database
      if(isSubscribed) {
        const response = await getPosts();     
        if(isSubscribed && response.status === 200) {
          // store post data in Redux
          dispatch(addPosts(response.data));
        }
      }
                 
    }
    let isSubscribed = true;
    if(isSubscribed && selectPostsData.status !== 'fulfilled' && !selectPostsData.data.length) {
      getPostsData(isSubscribed);
    } 
    return () => isSubscribed = null;
    //eslint-disable-next-line   
  }, [selectPostsData.data]);

  const setPosts = () => {

  }
  useEffect(() => {
    
    // set the pagination page
    setCurrentPages({
      from: pageCurr * posts_per_page,
      to: pageCurr * posts_per_page + posts_per_page,
    });

    
  }, [pageCurr]);

  // let tt = usePosts(currentPages.from, currentPages.to)

  return (    
    <div className={classes.root}>   
      <div className={classes.media}>
        {selectPostsData.data.length ? selectPostsData.data.slice(currentPages.from,currentPages.to).map(e => (
            <FadeInUpAnimation 
              className={classes.fadeinContainer}
              key={uuid()} >
            <div onClick={() => history.push(`/post/${e.id}`)} >
              <Post 
                key={e.photo_id}
                id={e.photo_id}
                title={e.title} 
                username={e.username} 
                created_on={e.created_on}
                />
            </div> 
            </FadeInUpAnimation>
        )) : <div key={uuid()}></div>}
      </div>        
      <div>
        <PaginationComp 
          pageCount={selectPostsData.data.length} 
          posts_per_page={posts_per_page}/>
      </div>
        
    </div>
  )
}

export default PostList;
