import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import fadeInUp from 'react-animations/lib/fade-in-up';
import Post from './Post';
import { v4 as uuid } from 'uuid';
import {
  getPostsData,
  selectPosts
} from '../dogfriendsPostsSlice';
import { makeStyles } from '@material-ui/core/styles';

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
    dispatch(getPostsData());
  },[dispatch]);
  
  return (    
    <>   
      <FadeInUpAnimation className={classes.fadeinContainer}>
        {selectList.data.length ? selectList.data.map(e => (
          <div 
            key={uuid()}
            onClick={() => history.push(`/post/${e.id}`)} >
            <Post 
              id={e.photo_id+'.txt'}
              title={e.title} 
              username={e.username} 
              created_on={e.created_on}
              />
          </div> 
      )) : <div></div>}
      </FadeInUpAnimation>
      <div style={{marginBottom: '20px'}} />
    </>
  )
}

export default PostList;
