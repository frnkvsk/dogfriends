import React, { useContext, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { 
  Zoom,
  makeStyles,
 } from '@material-ui/core';
 
import PostList from '../components/PostList';
import { AuthContext } from '../context/AuthContext';
import { PageInitContext } from '../context/PageInitContext';
// import { selectPageCount } from './../dogfriendsPageCountSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '85%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '85%'
    },
  },
  headingMargin1: {
    marginTop: 0
  },  
  headingMargin2: {
    marginTop: 50,
  },
  heading: {
    ...theme.typography.h2,
    textAlign: 'center',
  },
  subHeading: {
    ...theme.typography.subTitle,
    textAlign: 'center',
    marginBottom: 30,
  },
  cardImageList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    // [theme.breakpoints.down('lg')]: {
    //   flexDirection: 'column'
    // },
    // [theme.breakpoints.up('md')]: {
    //   flexDirection: 'column'
    // },
    // [theme.breakpoints.up('xs')]: {
    //   flexDirection: 'row',
    //   // alignItems: 'flex-start',
    //   // justifyContent: 'flex-start',
    // },
    marginTop: '25px',
  }
}));


const Home = () => {
  const classes = useStyles();
  
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
        setPageWelcome(['Dog Friends','Share Your Dog Photos with other dog friends']);
      }
    }
    setWelcome();
    console.log('Home useEffect')
    // eslint-disable-next-line
  },[]);

  return (        
    <div className={classes.root}>   
      <Zoom in={true} style={{ transitionDelay: '1000ms' }}>      
      <div key='div1' className={pageWelcome.length===1 ? classes.headingMargin1 : classes.headingMargin2}>
        <div key='div2' >{pageWelcome.map((e,i) => <div key={e+i} className={i===0 ? classes.heading : classes.subHeading}>{e}</div>)}</div>      
      </div>
      </Zoom>        
      <div>
        <div className={classes.cardImageList}>
          <PostList />
        </div>        
      </div>
    </div>    
  );
}

export default Home;