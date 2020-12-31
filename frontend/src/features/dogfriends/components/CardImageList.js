import React from 'react';
import styled, { keyframes } from 'styled-components';
import fadeInUp from 'react-animations/lib/fade-in-up';
import CardImageDisplay from './CardImageDisplay';

// in development we are using fake data so we don't make too many calls to the server
const imagesList = [
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1548199973-03cce0bbc87b.jpg',
  //   // src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'two happy little dogs',
  //   body: 'two happy little dogs',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1444212477490-ca407925329e.jpg',
  //   // src: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'three curious pups',
  //   body: 'three curious pups',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1494947665470-20322015e3a8.jpg',
  //   // src: 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'dog walk please',
  //   body: 'dog walk please',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1518717758536-85ae29035b6d.jpg',
  //   // src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'tasty',
  //   body: 'tasty',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1568572933382-74d440642117.jpg',
  //   // src: 'https://images.unsplash.com/photo-1568572933382-74d440642117?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'blue eyes',
  //   body: 'blue eyes',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1504595403659-9088ce801e29.jpg',
  //   // src: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'can I get a treat?',
  //   body: 'can I get a treat?',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1519150268069-c094cfc0b3c8.jpg',
  //   // src: 'https://images.unsplash.com/photo-1519150268069-c094cfc0b3c8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'puppies',
  //   body: 'puppies',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1534351450181-ea9f78427fe8.jpg',
  //   // src: 'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'curious',
  //   body: 'curious',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1558929996-da64ba858215.jpg',
  //   // src: 'https://images.unsplash.com/photo-1558929996-da64ba858215?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'did you see that?',
  //   body: 'did you see that?',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1477973770766-6228305816df.jpg',
  //   // src: 'https://images.unsplash.com/photo-1477973770766-6228305816df?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'lounging',
  //   body: 'lounging',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1541876176131-3f5e84a7331a.jpg',
  //   // src: 'https://images.unsplash.com/photo-1541876176131-3f5e84a7331a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'wanna play?',
  //   body: 'wanna play?',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1536809188428-e8ecf663d0be.jpg',
  //   // src: 'https://images.unsplash.com/photo-1536809188428-e8ecf663d0be?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'this feels great',
  //   body: 'this feels great',
  // },
  // { //public/test-images/photo-1546975490-e8b92a360b24.jpg
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1546975490-e8b92a360b24.jpg',
  //   // src: 'https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'surprise',
  //   body: 'surprise',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1541599540903-216a46ca1dc0.jpg',
  //   // src: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'awe',
  //   body: 'awe',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1518378188025-22bd89516ee2.jpg',
  //   // src: 'https://images.unsplash.com/photo-1518378188025-22bd89516ee2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'awe',
  //   body: 'awe',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1563889958751-bac9d543bdbf.jpg',
  //   // src: 'https://images.unsplash.com/photo-1563889958751-bac9d543bdbf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'blue eyes',
  //   body: 'blue eyes',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1491604612772-6853927639ef.jpg',
  //   // src: 'https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'hello',
  //   body: 'hello',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1552753966-adaca8bba782.jpg',
  //   // src: 'https://images.unsplash.com/photo-1552753966-adaca8bba782?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'life is good',
  //   body: 'life is good',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1546421845-6471bdcf3edf.jpg',
  //   // src: 'https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'too cool for school',
  //   body: 'too cool for school',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1551042155-c1aa9006d555.jpg',
  //   // src: 'https://images.unsplash.com/photo-1551042155-c1aa9006d555?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'curious',
  //   body: 'curious',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1527351872720-dc4768c9b696.jpg',
  //   // src: 'https://images.unsplash.com/photo-1527351872720-dc4768c9b696?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzF8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'like owner',
  //   body: 'like owner',
  // },
  // {
  //   src: process.env.PUBLIC_URL + 'test-images/photo-1457473075527-b0db85c08e66.jpg',
  //   // src: 'https://images.unsplash.com/photo-1457473075527-b0db85c08e66?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  //   title: 'got fish?',
  //   body: 'got fish?',
  // },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1444212477490-ca407925329e.jpg",	
    title: "cute pups" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1457473075527-b0db85c08e66.jpg",	
    title: "got fish?" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1470208564179-dd5b52a0d010.jpg",	
    title: "so fast" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1477973770766-6228305816df.jpg",	
    title: "bully" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1491604612772-6853927639ef.jpg",	
    title: "winter" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1494947665470-20322015e3a8.jpg",	
    title: "got walk?" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1504595403659-9088ce801e29.jpg",	
    title: "got treat?" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1508814437933-f0c7d18a9217.jpg",	
    title: "I'm hungry" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1517443191895-202c31142ccd.jpg",	
    title: "got treat?" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1518378188025-22bd89516ee2.jpg",	
    title: "aww" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1518717758536-85ae29035b6d.jpg",	
    title: "tasty" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1519150268069-c094cfc0b3c8.jpg",	
    title: "aww" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1519612535780-b5d7d96c36f3.jpg",	
    title: "rangers" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1520435298246-2304f39edfc6.jpg",	
    title: "two" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1520580413066-ac45756bdc71.jpg",	
    title: "I win" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1527351872720-dc4768c9b696.jpg",	
    title: "like master" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1533404367653-794d4cecb66c.jpg",	
    title: "black shepard" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1534351450181-ea9f78427fe8.jpg",	
    title: "curious" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1534361960057-19889db9621e.jpg",	
    title: "cute" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1536809188428-e8ecf663d0be.jpg",	
    title: "feels good" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1537151608828-ea2b11777ee8.jpg",	
    title: "cute" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1541599540903-216a46ca1dc0.jpg",	
    title: "snuggles" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1541876176131-3f5e84a7331a.jpg",	
    title: "friends" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1544568100-847a948585b9.jpg",	
    title: "hello how are you" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1546421845-6471bdcf3edf.jpg",	
    title: "too cool" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1546442586-ce2865175b4b.jpg",	
    title: "sit" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1546975490-e8b92a360b24.jpg",	
    title: "surprise" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1547494931-89530fd9764a.jpg",	
    title: "yummy" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1548199973-03cce0bbc87b.jpg",	
    title: "run" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1550469434-2e20fe65dad1.jpg",	
    title: "desert dog" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1551042155-c1aa9006d555.jpg",	
    title: "fluffy" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1552053831-71594a27632d.jpg",	
    title: "romeo" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1552753966-adaca8bba782.jpg",	
    title: "happy" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1557321031-077f055df343.jpg",	
    title: "bully" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1557496881-9f60d07a06ec.jpg",	
    title: "lounge" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1557976606-d068b9719915.jpg",	
    title: "dog in the grass" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1558929983-9f76c89d821a.jpg",	
    title: "birdy" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1558929996-da64ba858215.jpg",	
    title: "up in the sky" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1562317305-58a17fe2c09e.jpg",	
    title: "really?" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1562771465-db7e3de58f31.jpg",	
    title: "pudgy" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1563889958751-bac9d543bdbf.jpg",	
    title: "wolfy" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1568033471363-b5f050187173.jpg",	
    title: "bully" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1568034097741-fbbfdcca24ad.jpg",	
    title: "hello" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1568480487623-4d95844e1e66.jpg",	
    title: "beachy" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1568572933382-74d440642117.jpg",	
    title: "snow dog" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1568573681911-c221659d593d.jpg",	
    title: "leafy" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1569285105724-89e18c990b7c.jpg",	
    title: "dog walk" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1570666885815-807a09b271f1.jpg",	
    title: "cute" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1571404569825-8c3b2c7dea9a.jpg",	
    title: "old dog" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1573571945929-aa72904b953f.jpg",	
    title: "beach dog" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1574621950125-8ef3c39f6ec1.jpg",	
    title: "rescue team" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1574621959812-b007817715ae.jpg",	
    title: "rescue me" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1575994964795-862a6b7b32d7.jpg",	
    title: "gray dog" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1577272434860-aff625a47ee0.jpg",	
    title: "schnauzer" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1601758003453-6c950f17727d.jpg",	
    title: "rescued at last" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1605596992556-cd8eb912624e.jpg",	
    title: "joust" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1605812276723-c31bb1a68285.jpg",	
    title: "prince" 
  },
  {
    src: process.env.PUBLIC_URL + "test-images/photo-1605812276795-3b6f724842a1.jpg",	
    title: "princess" 
  },
];

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpAnimation = styled.div`
  animation: 1s ${fadeInUpAnimation};
`;

const CardImageList = ({imageCount}) => {
  return (
    <div style={{display: 'flex', alignContent: 'center', marginBottom: '80px'}}>
    {imagesList.map(e => (
      <FadeInUpAnimation>
        <CardImageDisplay src={e.src} title={e.title} body={e.body} />
      </FadeInUpAnimation>      
    ))}
    <div style={{marginBottom: '20px'}} />
    </div>
    )
}

export default CardImageList
