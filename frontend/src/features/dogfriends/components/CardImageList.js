import React from 'react';
import styled, { keyframes } from 'styled-components';
import fadeInUp from 'react-animations/lib/fade-in-up';
import CardImageDisplay from './CardImageDisplay';

const imagesList = [
  {
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'two happy little dogs',
    body: 'two happy little dogs',
  },
  {
    src: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'three curious pups',
    body: 'three curious pups',
  },
  {
    src: 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'dog walk please',
    body: 'dog walk please',
  },
  {
    src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'tasty',
    body: 'tasty',
  },
  {
    src: 'https://images.unsplash.com/photo-1568572933382-74d440642117?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'blue eyes',
    body: 'blue eyes',
  },
  {
    src: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'can I get a treat?',
    body: 'can I get a treat?',
  },
  {
    src: 'https://images.unsplash.com/photo-1519150268069-c094cfc0b3c8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'puppies',
    body: 'puppies',
  },
  {
    src: 'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'curious',
    body: 'curious',
  },
  {
    src: 'https://images.unsplash.com/photo-1558929996-da64ba858215?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'did you see that?',
    body: 'did you see that?',
  },
  {
    src: 'https://images.unsplash.com/photo-1477973770766-6228305816df?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'lounging',
    body: 'lounging',
  },
  {
    src: 'https://images.unsplash.com/photo-1541876176131-3f5e84a7331a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'wanna play?',
    body: 'wanna play?',
  },
  {
    src: 'https://images.unsplash.com/photo-1536809188428-e8ecf663d0be?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'this feels great',
    body: 'this feels great',
  },
  {
    src: 'https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'surprise',
    body: 'surprise',
  },
  {
    src: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'awe',
    body: 'awe',
  },
  {
    src: 'https://images.unsplash.com/photo-1518378188025-22bd89516ee2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'awe',
    body: 'awe',
  },
  {
    src: 'https://images.unsplash.com/photo-1563889958751-bac9d543bdbf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'blue eyes',
    body: 'blue eyes',
  },
  {
    src: 'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'hello',
    body: 'hello',
  },
  {
    src: 'https://images.unsplash.com/photo-1552753966-adaca8bba782?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'life is good',
    body: 'life is good',
  },
  {
    src: 'https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'too cool for school',
    body: 'too cool for school',
  },
  {
    src: 'https://images.unsplash.com/photo-1551042155-c1aa9006d555?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'curious',
    body: 'curious',
  },
  {
    src: 'https://images.unsplash.com/photo-1527351872720-dc4768c9b696?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzF8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'like owner',
    body: 'like owner',
  },
  {
    src: 'https://images.unsplash.com/photo-1457473075527-b0db85c08e66?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'got fish?',
    body: 'got fish?',
  },
];

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpAnimation = styled.div`
  animation: 1s ${fadeInUpAnimation};
`;

const CardImageList = ({imageCount}) => {
  return (
    <>
    {imagesList.map(e => (
      <FadeInUpAnimation>
        <CardImageDisplay src={e.src} title={e.title} body={e.body} />
      </FadeInUpAnimation>
      
    ))}
    </>
    )
}

export default CardImageList
