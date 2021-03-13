import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Zoom,
  LinearProgress,
  makeStyles,
 } from '@material-ui/core'; 
import PostList from '../components/PostList';
import { AuthContext } from '../context/AuthContext';
import { PageInitContext } from '../context/PageInitContext';
import { selectInitInfo } from '../dogfriendsInitInfoSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headingMargin1: {
    marginTop: 0,
  },  
  headingMargin2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  heading: {
    ...theme.typography.h2,
    marginBottom: 2,
  },
  subHeading: {
    ...theme.typography.subtitle1,
    marginBottom: 30,
  },
  cardImageList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '25px',
  },
  progressBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

const Home = () => {
  const classes = useStyles();  
  const selectInitInfoData = useSelector(selectInitInfo);
  const [pageWelcome, setPageWelcome] = useState([]); 
  const auth = useContext(AuthContext);
  const pageInitContext = useContext(PageInitContext);
  const username = auth.authState.userInfo.username;  

  useEffect(() => {
    const setWelcome = () => {   
      pageInitContext.incrementInitCount();   
      if(username) {
        if(pageInitContext.pageInitState && pageInitContext.pageInitState.pageInitCount < 1) {
          setPageWelcome([`Welcome back ${username}`]);
        } else {
          setPageWelcome(['']);
        }
      } else {
        setPageWelcome(['Dog Friends','Share your dog photos with other dog friends']);
      }
    }
    setWelcome();
    // eslint-disable-next-line
  },[]);

  console.log('selectInitInfoData', selectInitInfoData)
  return (        
    <div className={classes.root}>   
      <Zoom in={true} style={{ transitionDelay: '1ms' }}>      
      <div key='home1' className={pageWelcome.length===1 ? classes.headingMargin1 : classes.headingMargin2}>
        {pageWelcome.map((e,i) => i===0 ? 
          <div key={e+i} className={classes.heading}>{e}</div> : <div key={e+i} className={classes.subHeading}>{e}</div>)}      
      </div>
      </Zoom>        
      <div>
        <div className={classes.cardImageList}>
          {selectInitInfoData.status === 'fulfilled' ? (
            <PostList />
          ) : (
            <div className={classes.progressBar}>
              <div className={classes.subHeading}>Sorry, our free server is sleeping...</div>
              <div className={classes.subHeading}>It will take a few seconds more for it to wake up...</div>
              <LinearProgress />
            </div>)}
          
        </div>        
      </div>
    </div>    
  );
}

export default Home;