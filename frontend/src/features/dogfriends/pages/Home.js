import React from 'react';

import { 
  Grid,
  Button,
  Typography,
  makeStyles,
 } from '@material-ui/core';
 
import ButtonArrow from '../components/ButtonArrow';
import CardImageList from '../components/CardImageList';

const useStyles = makeStyles((theme) => ({
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    // border: '1px solid red',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    // border: '1px solid blue',
  },
  cardImageList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25px',
    // border: '1px solid red',
  }
}))
const Home = () => {
  const classes = useStyles();

  return (
    <Grid container direction='column'>
      <Grid sm item>
        <Grid container justify='center' alignItems='center' direction='row'>
          <Grid container className={classes.heading}>
            <Typography variant='h2' align='center'>
              Share Your Dog Photos
              <br />
              with other dog friends
            </Typography>
          </Grid>
          <Grid container className={classes.buttons}>
            <Grid item>
              <Button variant='contained'>
                Get Started
                <ButtonArrow width='15' height='15' fill='red' />
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined'>Login</Button>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
      <Grid sm item>
        <Grid container className={classes.cardImageList}>
          <CardImageList imageCount={10} />
        </Grid>        
      </Grid>
    </Grid>
  );
}

export default Home;


// import React, { useContext, useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AuthContext } from '../context/AuthContext';
// import { getPostsData, selectPosts } from '../dogfriendsPostsSlice';
// // import {  selectUser } from '../dogfriendsUserSlice';
// import { Box, makeStyles } from '@material-ui/core';
// import PaginationComp from './../components/Pagination';
// import { selectPageCount } from '../dogfriendsPageCountSlice'; 
// import PostVotes from '../components/PostVotes';
// import ThreadList from '../components/ThreadList';

// const useStyles = makeStyles((theme) => ({
//   root: {       
//     display: 'flex',
//     flexDirection: 'column',
//     margin: '15px 0 0 0' ,
//   },
//   title: {
//     fontSize: '32px',
//     width: '100%',
//     paddingRight: '10px',
//   },
//   body: {
//     display: 'flex',
//     width: '100%',
//     border: '1px solid orange',
//   },
//   sidePanel: {
//     width: '300px',
//     margin: '15px',
//   },
//   display: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//     margin: '20px',
//     paddingRight: '10px',
//     border: '1px solid red'
//   },
//   blog: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     minWidth: '400px',
//     [theme.breakpoints.down('xs')]: {
//       width: '100%'
//     },
//     [theme.breakpoints.up('md')]: {
//       width: '48%'
//     },
//     height: '120px',
//     margin: '10px 0 10px 0',
//     flexWrap: 'wrap',
//     border: '1px solid red',
//     // border: '1px solid #e0e0e0',
    
//   },
//   link: {
//    textDecoration: 'none', 
//    color: '#2196f3',
//    padding: '7px',
//   },
//   description: {
//     width: '93%',
//     padding: '7px',
//     flexWrap: 'wrap',
//     overflow: 'hidden',
//   },
//   threadBox: {
//     backgroundColor: '#b6c2b7',
//     width: '100%',
//     height: '100px',
//   }
  
// }));

// export default function Home() {
//   const classes = useStyles();
//   const auth = useContext(AuthContext);
//   const dispatch = useDispatch();
//   const postList = useSelector(selectPosts);
//   const { pageCurr } = useSelector(selectPageCount);
//   const [currentPages, setCurrentPages] = useState({
//     from: pageCurr * 10,
//     to: pageCurr * 10 + 10,
//   });


//   useEffect(() => {
//     dispatch(getPostsData());
//   }, [dispatch]);

//   useEffect(() => {
//     setCurrentPages({
//       from: pageCurr * 10,
//       to: pageCurr * 10 + 10,
//     })
//   }, [pageCurr]);
  

//   return (
    
//     <div className={classes.root}>
//       <div className={classes.title}>
//         Welcome to <b> Dog Friends</b>.
//       </div>
//       <div className={classes.body}>
//         <div className={classes.sidePanel} >
//           <Box className={classes.threadBox}>
//             Tread Box
//           </Box>
//           <ThreadList />
//         </div>        
//         <div className={classes.display}>
//           {(postList && postList.status === 'fulfilled' && postList.data.length) && postList.data.slice(currentPages.from, currentPages.to).map(e => (
//             <div className={classes.blog} key={e.id}>
//               <a className={classes.link} href={`/${e.id}`}>{e.title}</a>
//               <div className={classes.description}>{e.description}</div>
//               <PostVotes id={e.id} auth={auth}/>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <PaginationComp pageCount={postList.data.length}/> 
//     </div>
//   );
// }