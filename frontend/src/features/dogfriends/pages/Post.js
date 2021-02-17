import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
// import EditIcon from '@material-ui/icons/Edit';

// import { useSelector, useDispatch } from 'react-redux';
import PostSourceDisplay from '../components/PostSourceDisplay';
import { 
  getPostsData,
  selectPosts, 
} from '../dogfriendsPostsSlice';
import RepliesList from '../components/RepliesList';

// import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {    
    display: 'flex',
    alignItems: 'flex-start',
    
    // width: '100%', 
    fontSize: '22px',
    padding: '7px',
    
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '85%',
      border: '1px solid blue', 
    }, 
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      
      border: '1px solid green', 
    },
  },
  replies: {
    // [theme.breakpoints.down('md')]: {
    //   width: '100%'
    // },
    // [theme.breakpoints.up('lg')]: {
    //   width: '85%'
    // },
    // [theme.breakpoints.up('xl')]: {
    //   width: '75%'
    // },
    border: '1px solid orange',
  }
  
}));

export default function Post() {
  const classes = useStyles();
  const { id } = useParams();
  const selectList = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [post, setPost] = useState(null)
  console.log('id',id)
  // const auth = useContext(AuthContext);
  // const history = useHistory();
  useEffect(() => {
    if(selectList.status !== 'fulfilled' && !post) {
      dispatch(getPostsData());
    } else if(!post) {
      setPost( selectList.data.find(e => e.id === id) );
    }
    console.log('Post useEffect post',post)
  }, [selectList.status, selectList.data, post, dispatch, id]);

  

  return (
    <div className={classes.root}>
      {post && <PostSourceDisplay post={post} />}
      <div className={classes.replies}>
        <RepliesList />
      </div>
    </div>
  );
}