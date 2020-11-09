import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getCommentsDataById,
  addNewComment,
  removeComment,
  selectComments,
 } from '../dogfriendsCommentsSlice';
import { makeStyles } from '@material-ui/core/styles';
import { Button, OutlinedInput } from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0px',
    // border: '1px solid pink',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '30px 0 20px 0',
    border: '1px solid red',
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginRight: '5px',
  },
  delete: {
    color: 'red',
    fontSize: '22px',
    fontWeight: '700',
    padding: '0 10px 0 5px',
    cursor: 'pointer',
  },
  deleteWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
  },
  button: {
    width: '60px',
    marginTop: '10px',
  }
}));

const BlogComments = ({id}) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const commentList = useSelector(selectComments);
  const [comment, setComment] = useState('');

  useEffect(() => {    
    dispatch(getCommentsDataById(id)); 
  }, [dispatch, id]);  

  const handleSubmit = async e => {   
    e.preventDefault();
    if(comment.length) {
      const payload = {
        id: id,
        comment: comment, 
        token: auth.authState.token
      }
      await dispatch(addNewComment(payload));
      dispatch(getCommentsDataById(id)); 
      setComment('');      
    } 
  }
  
  const handleDelete = deleteId => {
    dispatch(removeComment({
      id: deleteId, 
      username: auth.authState.userInfo.username,
      token: auth.authState.token
    }));
    setTimeout(() => {
      dispatch(getCommentsDataById(id)); 
    }, 100);
  }

  const handleChange = e => {
    setComment(e.target.value);
  }

  return (
    <>
      <div className={classes.root}>
        {commentList.data.length ? commentList.data.map(e => (
          <div key={e.id} className={classes.deleteWrapper}>
            <div className={classes.delete} onClick={() => handleDelete(e.id)}>x</div>{e.text}</div>
        )) : ''}
      </div>
      <form className={classes.form} noValidate autoComplete="off">              
        <OutlinedInput 
          name="title"
          className={classes.input} 
          placeholder="New Comment"
          variant="outlined" 
          autoFocus
          value={comment}          
          onChange={handleChange}
        />        
        <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit} >
            Add
        </Button>      
      </form>
    </>    
  );
}

export default BlogComments;