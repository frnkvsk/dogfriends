import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import fadeInUp from 'react-animations/lib/fade-in-up';
import PostImageDisplay from './PostImageDisplay';
import { v4 as uuid } from 'uuid';
import {
  getPostsData,
  selectPosts
} from '../dogfriendsPostsSlice';
import { makeStyles } from '@material-ui/core/styles';


// import {ReactCSSTransitionGroup} from 'react-transition-group'; 

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpAnimation = styled.div`
  animation: 3s ${fadeInUpAnimation};
`;

// const AWS_IMAGE_BUCKET_URL_BASE='https://dogfriends.s3-us-west-2.amazonaws.com/';

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
    border: '2px solid #fafafa',
    padding: '40px',
  },
});

const PostList = ({imageCount}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const selectList = useSelector(selectPosts);
  
  useEffect(() => {
    if(selectList.status !== 'fulfilled' && !posts.length) {
      dispatch(getPostsData());
    } else if(selectList.status === 'fulfilled') {
      setPosts(
        selectList.data.map(e => (
          <div 
            key={uuid()}
            onClick={() => history.push(`/post/${e.id}`)} >
            <PostImageDisplay 
              src={`${e.base_url}/${e.photo_id}.txt`} 
              title={e.title} 
              username={e.username} 
              />
          </div>
      )));
    }
    console.log('PostList useEffect getPosts()',posts)
    console.log('PostList useEffect selectList',selectList)
    // eslint-disable-next-line
  },[selectList.status]);
  
  return (    
    <>   
      <FadeInUpAnimation className={classes.fadeinContainer}>
        {posts}
      </FadeInUpAnimation>
      <div style={{marginBottom: '20px'}} />
    </>
  )
}

export default PostList;
