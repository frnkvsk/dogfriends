import React, { useEffect, useContext } from 'react';
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
  addNewReply,
  selectReplies
} from '../dogfriendsRepliesSlice';
import ReplyDisplay from './ReplyDisplay';
import ReplyFormNew from './ReplyFormNew';
import { 
  Grid, } from '@material-ui/core';

  import { AuthContext } from '../context/AuthContext';

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
    minWidth: '350px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      minWidth: '300px',
    }, 
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '300px',
    },
    
    // border: '1px solid green',
  },
  gridList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    // width: '100%',
    height: 450,
    overflow: 'auto',
    padding: '3px',
    border: '1px solid #eeeeee',
  },
  gridItem: {
    // width: '50%',
    margin: '2px 0 2px 0',
    padding: '0 5px 0 5px',
    // border: '1px solid orange',
  }
}));

export default function RepliesList() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { parent_id } = useParams();
  const dispatch = useDispatch();
  
  const selectList = useSelector(selectReplies);
  // const [replies, setReplies] = useState(selectList);
  /**
   * TODO:
   * refreshing this page and home page causes the useEffect on getting images to go on unstopped till it crashes. Need to fix.
   */

  useEffect(() => {
    dispatch(getRepliesDataById(parent_id));    
    console.log('---RepliesList useEffect getReplies() selectList.status',selectList.status)
    // eslint-disable-next-line
  }, [dispatch, parent_id]);
  
  const handleSubmit = async (body) => {
    if(body) {      
      const payload = {
        parent_id,
        body,
        username: auth.authState.userInfo.username,
        _token: auth.authState.token
      }
      // commit reply details to database
      await dispatch(addNewReply(payload)); 
      console.log('-RepliesList handleSubmit dispatch')
      // update replies list
      dispatch(getRepliesDataById(parent_id));
    }
    
  };

  console.log('RepliesList replies', selectList.status, selectList)
  return (  
    
    <div key={uuid()} className={classes.root} >
      <div className={classes.gridList} >
        {selectList.data.length && selectList.data.map(e => (
          <div key={uuid()}>
            <Grid item className={classes.gridItem}>
              <ReplyDisplay 
                username={e.username}
                body={e.body} 
                created_on={e.created_on} />
            </Grid>
            
          </div>
      ))}
      </div>
      <ReplyFormNew handleSubmit={handleSubmit}/>             
    </div>    
  );
}
