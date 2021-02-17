import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';

import { 
  getPostsData,
  selectPosts, 
} from '../dogfriendsPostsSlice';

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    margin: '0 20px',
    cursor: 'pointer',
    width: '100%',
    minWidth: '400px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      minWidth: '300px',
    }, 
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '300px',
    },
  },
}));

export default function RepliesList() {
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
    console.log('RepliesList useEffect post',post)
  }, [selectList.status, selectList.data, post, dispatch, id]);
  console.log('RepliesList post',post)
  return (  
    <div key={uuid()} className={classes.root} >
      <h1>Replies</h1>        
    </div>    
  );
}
