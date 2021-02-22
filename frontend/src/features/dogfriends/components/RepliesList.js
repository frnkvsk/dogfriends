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
import { 
  GridList,
  GridListTile } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({  
  root: {
    // display: 'flex',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // overflow: 'hidden',
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
    border: '1px solid green',
  },
  gridList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    // height: 450,
    
    border: '1px solid red',
  },
  gridItem: {
    width: '100%',
    margin: '2px 0 2px 0',
  }
}));

export default function RepliesList() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [replies, setReplies] = useState([]);
  const selectList = useSelector(selectReplies);
  /**
   * TODO:
   * refreshing this page and home page causes the useEffect on getting images to go on unstopped till it crashes. Need to fix.
   */

  const getReplies = async () => {
    const res = await dispatch(getRepliesDataById(id));
    console.log('RepliesList getReplies res',res)
    setReplies(
      res.payload.map(e => (
        <div key={uuid()}>
          <GridListTile component='div' className={classes.gridItem}>
            <ReplyDisplay 
              username={e.username}
              body={e.body} 
              created_on={e.created_on} />
          </GridListTile>
          
        </div>
    )));
  }

  useEffect(() => {
    if(!replies.length) {
      getReplies();
    } 
    console.log('RepliesList useEffect getReplies()')
    // console.log('RepliesList useEffect selectList',selectList)
    // eslint-disable-next-line
  }, [id]);
  
  console.log('RepliesList replies',replies, selectList.status)
  return (  
    
    <div key={uuid()} className={classes.root} >
      <GridList cellHeight={60} className={classes.gridList}>
        {replies}
      </GridList>
      <ReplyFormNew parent_id={id}/>             
    </div>    
  );
}
