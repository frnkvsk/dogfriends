import React, { useMemo } from 'react';
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

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpAnimation = styled.div`
  animation: 3s ${fadeInUpAnimation};
`;

const useStyles = makeStyles({
  root: {
    maxWidth: '250px',
    padding: '15px',
    margin: '15px',
  },
  fadeinContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // border: '2px solid #fafafa',
    padding: '40px',
  },
});

const PostList = ({imageCount}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectPostsData = useSelector(selectPosts);
  
  
  // useMemo(() => {
    // const getPostsData = async () => {
    //   // gets all posts from database
    //   const response = await getPosts();
      
    //   // TODO: create pagination to only show so many per page

    //   if(response.status === 200) {
    //     dispatch(addPosts(response.data));
    //   }  
         
    // }
    // if(selectPostsData.status !== 'fulfilled') {
    //   getPostsData();
    // } 
    // eslint-disable-next-line   
  // }, [selectPostsData.data]);

  console.log('PostList selectList',selectPostsData)
  return (    
    <>   
      
        {selectPostsData.data.length ? selectPostsData.data.map(e => (
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
      
      <div style={{marginBottom: '20px'}} />
    </>
  )
}

export default PostList;
