import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import { useSelector, useDispatch } from 'react-redux';
import { 
  getPostDataById,
  removePost, 
  selectPosts, 
  getPostsData,
} from '../dogfriendsPostsSlice';
import BlogForm from './../components/BlogForm';
import BlogComments from '../components/BlogComments';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    
    display: 'flex',
    flexDirection: 'column',
    width: '100%', 
    fontSize: '22px',
    padding: '7px',
    border: '1px solid #e0e0e0', 
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: '32px',
    fontWeight: '500',
    marginBottom: '0px',
  },
  title: {
    fontSize: '56px',
  },
  closeIcon: {
    color: 'red',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginRight: '10px',
  },
  editIcon: {
    color: '#2196f3',
    cursor: 'pointer',
    marginRight: '10px',
  },
  hr: {
    width: '100%',
    border: '1px solid #9e9e9e',
  },
  button: {
    width: '80px',
  },
  description: {
    fontSize: '22px',
    fontStyle: 'italic',
    margin: '12px 0 5px 0',
    
  },
  body: {
    fontSize: '22px',

    margin: '25px 0 5px 0',
  },
  
}));

export default function Post() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [state, setState] = useState('display');
  const dispatch = useDispatch();
  const postList = useSelector(selectPosts);
  const {id} = useParams();
  const rootRef = React.useRef(null);

  useEffect(() => {
    dispatch(getPostDataById(id));
  }, [dispatch, id]);
  
  const handleEdit = () => {
    setState('edit');
  }

  const handleDelete = () => {
    dispatch(removePost({
      id: id, 
      username: auth.authState.userInfo.username,
      token: auth.authState.token
    }));
    setTimeout(() => {
      dispatch(getPostsData());
    }, 100);
    history.push('/');
  }

  return (
    <div className={classes.root}>
      {state === 'display' ? (
        postList && postList.data && (
          <>
            <div className={classes.titleWrapper}>
              <div className={classes.title}>{postList.data.title}</div>
              <div className={classes.iconWrapper} >
                {postList.data.username === auth.authState.userInfo.username &&
                  <>
                  <Tooltip title="Edit Post" ref={() => rootRef.current}>
                    <EditIcon className={classes.editIcon} onClick={handleEdit}/>
                  </Tooltip>
                  <Tooltip title="Delete Post" ref={() => rootRef.current}>
                    <CloseIcon className={classes.closeIcon} onClick={handleDelete}/>
                  </Tooltip> 
                  </> 
                }
                                
              </div>
            </div>          
            <div className={classes.description}>{postList.data.description}</div>
            <div className={classes.body}>{postList.data.body}</div>
            <hr className={classes.hr}/>
            <div className={classes.titleWrapper}>Comments</div>
            <BlogComments id={id}/>
          </>
      )) : (
        <BlogForm data={postList.data}/>
      )}      
    </div>
  );
}