import React, { useContext, useEffect, useState } from 'react';
// import { 
//   useSelector,
//   // useDispatch 
// } from 'react-redux';
import { 
  // Grid,
  // Button,
  // Typography,
  makeStyles,
 } from '@material-ui/core';
 
// import ButtonArrow from '../components/ButtonArrow';
import PostList from '../components/PostList';
import { AuthContext } from '../context/AuthContext';
import { PageInitContext } from '../context/PageInitContext';
// import { selectAvatar } from '../dogfriendsAvatarSlice';
// import { selectPosts } from '../dogfriendsPostsSlice';
// import { selectPhotos } from '../dogfriendsPhotosSlice';
// import { selectUser } from '../dogfriendsUserSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '85%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '75%'
    },
  },
  heading: {
    ...theme.typography.h2,
    textAlign: 'center',
    border: '1px solid blue',
  },
  cardImageList: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('xl')]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    marginTop: '25px',
    border: '1px solid red',
  }
}));


const Home = () => {
  const classes = useStyles();
  const [pageWelcome, setPageWelcome] = useState(''); 
  const auth = useContext(AuthContext);
  const pageInitContext = useContext(PageInitContext);
  
  // const dispatch = useDispatch();
  // const selectAvatarData = useSelector(selectAvatar);
  // const selectPostsData = useSelector(selectPosts);
  // const selectPhotosData = useSelector(selectPhotos);
  // const selectUserData = useSelector(selectUser);
  const username = auth.authState.userInfo.username; 
  
  // console.log('Home selectAvatarData.data',selectAvatarData.data)
  console.log('Home auth',auth)
  // console.log('Home selectPostsData',selectPostsData)
  // console.log('Home selectPhotosData',selectPhotosData)
  // console.log('Home selectUserData',selectUserData)
  // const [pageLoadCount, setPageLoadCount] = useState(0);

  // if(!selectUserData.data.pageLoadCount) {
  //   dispatch(addUserInfo({
  //     ...selectUserData.data,
  //     pageLoadCount: 0
  //   }));
  // } else {
  //   // const count = selectUserData.data.pageLoadCount || 0;
  //   dispatch(addUserInfo({
  //     ...selectUserData.data,
  //     pageLoadCount: selectUserData.data.pageLoadCount + 1
  //   }));
  // }

  useEffect(() => {
    const setWelcome = () => {   
      pageInitContext.incrementInitCount();   
      if(username) {
        if(pageInitContext.pageInitState && pageInitContext.pageInitState.pageInitCount < 1) {
          setPageWelcome(`Welcome back ${username}`);
        } else {
          setPageWelcome('');
        }
      } else {
        setPageWelcome('Share Your Dog Photos<br />with other dog friends')
      }
    }
    // pageInitContext.incrementInitCount();
    setWelcome();
    console.log('Home useMemo')
    // eslint-disable-next-line
  },[]);

  console.log('Home pageInitContext',pageInitContext)
  return (        
    <div className={classes.root}>      
      <div className={classes.heading}>
       {pageWelcome}      
      </div>        
      <div>
        <div className={classes.cardImageList}>
          <PostList imageCount={10} />
        </div>        
      </div>
    </div>    
  );
}

export default Home;