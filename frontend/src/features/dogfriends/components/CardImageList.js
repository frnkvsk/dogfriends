import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import fadeInUp from 'react-animations/lib/fade-in-up';
import CardImageDisplay from './CardImageDisplay';
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

const AWS_IMAGE_BUCKET_URL_BASE='https://dogfriends.s3-us-west-2.amazonaws.com/';

const useStyles = makeStyles({
  root: {
    maxWidth: '250px',
    padding: '15px',
    margin: '15px',
  },
  fadeinContainer: {
    display: 'flex',
    border: '2px solid #fafafa',
    padding: '40px',
  },
});

const CardImageList = ({imageCount}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);
  const selectList = useSelector(selectPosts);
  
  useEffect(() => {
    if(selectList.status !== 'fulfilled' && !postList.length) {
      dispatch(getPostsData());
    } else if(selectList.status === 'fulfilled') {
      setPostList(
        selectList.data.map(e => (
          <div key={uuid()}>
            <CardImageDisplay 
              src={`${AWS_IMAGE_BUCKET_URL_BASE}${e.photo_id}.txt`} 
              title={e.title} body={e.body} />
          </div>
      )));
    }
    console.log('CardImageList useEffect getPosts()',postList)
    console.log('CardImageList useEffect selectList',selectList)
    // eslint-disable-next-line
  },[selectList.status]);
  
  return (    
    <>   
      <FadeInUpAnimation className={classes.fadeinContainer}>
        {postList}
      </FadeInUpAnimation>
      <div style={{marginBottom: '20px'}} />
    </>
  )
}

export default CardImageList;
