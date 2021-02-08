import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import fadeInUp from 'react-animations/lib/fade-in-up';
import CardImageDisplay from './CardImageDisplay';
import { v4 as uuid } from 'uuid';
import {getPostsData} from '../dogfriendsPostsSlice';
// in development we are using fake data so we don't make too many calls to the server
import imagesList from '../assets/testImageList';
import { useDispatch } from 'react-redux';

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpAnimation = styled.div`
  animation: 3s ${fadeInUpAnimation};
`;

const CardImageList = ({imageCount}) => {
  const dispatch = useDispatch();
  let postList;
  const getPosts = async () => {
    postList = await dispatch(getPostsData());
  }
  useEffect(() => {
    getPosts();
    console.log('CardImageList useEffect getPosts()',postList)
  });
  console.log('CardImageList postList',postList);
  return (
    // <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%', marginBottom: '80px'}}>
    <>
    {imagesList.map(e => (
      <FadeInUpAnimation key={uuid()}>
        <CardImageDisplay src={e.src} title={e.title} body={e.body} />
      </FadeInUpAnimation>      
    ))}
    <div style={{marginBottom: '20px'}} />
    </>
    )
}

export default CardImageList
