import React, { useEffect, useState } from 'react';
import { 
  useSelector,
  useDispatch 
} from 'react-redux';
import { useParams } from 'react-router';
// import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';

import { 
  getRepliesDataById,
  // addNewReply,
  selectReplies
} from '../dogfriendsRepliesSlice';
import ReplyDisplay from './ReplyDisplay';
import ReplyFormNew from './ReplyFormNew';

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  const dispatch = useDispatch();
  const [replies, setReplies] = useState([]);
  const selectList = useSelector(selectReplies);

  useEffect(() => {
    if(selectList.status !== 'fulfilled' && !replies.length) {
      dispatch(getRepliesDataById(id));
    } else if(selectList.status === 'fulfilled') {   
      // setReplies([]);   
      setReplies(
        selectList.data.map(e => (
          <div key={uuid()}>
            <ReplyDisplay 
              username={e.username}
              body={e.body} 
              created_on={e.created_on} 
              />
          </div>
      )));
      console.log('RepliesList useEffect selectList',selectList)
    }
    // console.log('RepliesList useEffect getPosts()',replies)
    // console.log('RepliesList useEffect selectList',selectList)
    // eslint-disable-next-line
  },[selectList.status]);
  
  console.log('RepliesList replies',replies, selectList.status)
  return (  
    <div key={uuid()} className={classes.root} >
      <div>
      {replies}
      </div>
      <ReplyFormNew parent_id={id}/>
             
    </div>    
  );
}
