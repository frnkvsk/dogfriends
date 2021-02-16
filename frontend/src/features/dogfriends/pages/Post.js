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

// import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {    
    display: 'flex',
    flexDirection: 'column',
    width: '100%', 
    fontSize: '22px',
    padding: '7px',
    border: '1px solid blue', 
    // border: '1px solid #e0e0e0', 
  },
  
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
    </div>
  );
}