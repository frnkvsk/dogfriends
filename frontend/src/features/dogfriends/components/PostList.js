import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fadeInUp from 'react-animations/lib/fade-in-up';

import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import styled, { keyframes } from 'styled-components';

import Post from './Post';

import { selectPosts, addPosts } from '../dogfriendsPostsSlice';
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
  const selectList = useSelector(selectPosts);
  
  
  useEffect(() => {
    const getPostsData = async () => {
      const response = await getPosts();
      if(response.status === 200) {
        dispatch(addPosts(response.data));
      }      
    }
    if(selectList.status !== 'fulfilled') {
      getPostsData();
    }    
  }, [selectList.status, dispatch]);
  console.log('PostList selectList',selectList)
  return (    
    <>   
      
        {selectList.data.length ? selectList.data.map(e => (
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
