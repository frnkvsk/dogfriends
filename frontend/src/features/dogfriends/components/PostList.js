import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fadeInUp from 'react-animations/lib/fade-in-up';

import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import styled, { keyframes } from 'styled-components';

import Post from './Post';

import { selectPosts, addPosts } from '../dogfriendsPostsSlice';
// import { selectPhotos, addPhotoUrl } from '../dogfriendsPhotosSlice';
// import useImageUrl from '../hooks/useImageUrl';
import {
  getPosts,
} from '../api/DogfriendsApi';
import { 
  // setPages,
  selectPageCount,
 } from '../dogfriendsPageCountSlice';
import PaginationComp from './Pagination';

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpAnimation = styled.div`
  animation: 3s ${fadeInUpAnimation};
`;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '80vh',
    // border: '1px solid red',
  },
  media: {
    display: 'flex',
    
  },
  fadeinContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // marginBottom: 250,
  },
  pagination: {
    // height: '100%',
    // border: '1px solid blue',
  }
});

const PostList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const posts_per_page = 2;
  const selectPostsData = useSelector(selectPosts);
  const { pageCurr } = useSelector(selectPageCount);
  const [currentPages, setCurrentPages] = useState({
    from: pageCurr * posts_per_page,
    to: pageCurr * posts_per_page + posts_per_page,
  });

  useEffect(() => {
    const getPostsData = async () => {
      // gets all posts from database
      const response = await getPosts();
      
      // TODO: create pagination to only show so many per page
      
      
      if(response.status === 200) {
        dispatch(addPosts(response.data));
      }  
         
    }
    if(selectPostsData.status !== 'fulfilled' && !selectPostsData.data.length) {
      getPostsData();
    } 
    //eslint-disable-next-line   
  }, [selectPostsData.data]);

  useEffect(() => {
    setCurrentPages({
      from: pageCurr * posts_per_page,
      to: pageCurr * posts_per_page + posts_per_page,
    })
  }, [pageCurr]);
  

  console.log('PostList selectList',selectPostsData)
  console.log('PostList from to',currentPages.from, currentPages.to, Math.floor(selectPostsData.data.length/currentPages.to))
  return (    
    <div className={classes.root}>   
      <div className={classes.media}>
        {selectPostsData.data.length ? selectPostsData.data.slice(currentPages.from,currentPages.to).map(e => (
            <FadeInUpAnimation 
              className={classes.fadeinContainer}
              key={uuid()} >
            <div 
                        
              onClick={() => history.push(`/post/${e.id}`)} >
              <Post 
                id={e.photo_id}
                title={e.title} 
                username={e.username} 
                created_on={e.created_on}
                />
            </div> 
            </FadeInUpAnimation>
        )) : <div></div>}
      </div>
        
      <div className={classes.pagination}>
      <PaginationComp pageCount={selectPostsData.data.length} posts_per_page={posts_per_page}/>
      </div>
    </div>
  )
}

export default PostList;
