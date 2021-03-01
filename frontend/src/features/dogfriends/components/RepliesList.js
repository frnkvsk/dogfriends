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
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',    
    // margin: '0 20px',
    // cursor: 'pointer',
    width: '100%',
    minWidth: '350px',
    // width: 'fit-content',
    // blockSize: 'fit-content',
    // [theme.breakpoints.down('md')]: {
    //   width: '80%',
    // }, 
    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    // },
    
    border: '1px solid #eeeeee',
    boxShadow: '0 10px 6px -6px #80808040',
  },
  commentSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stetch',
    justifyContent: 'flex-start',
    width: '100%',
    height: 450,
    overflow: 'auto',
    // padding: '3px',
    // border: '1px solid blue',
    // border: '1px solid #eeeeee',
  },
  comment: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'stetch',
    width: 'auto',
    // margin: '2px 5px 2px 0',
    // padding: '0 15px 0 8px',
    border: '1px solid #eeeeee',
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
      console.log('-RepliesList handleSubmit dispatch', payload)
      // update replies list
      dispatch(getRepliesDataById(parent_id));
    }
    
  };

  console.log('RepliesList replies', selectList.status, selectList)
  return (  
    
    <div className={classes.root} >
      <div className={classes.commentSection} >
        {selectList.data.length ? selectList.data.map(e => (
          <div key={uuid()}>
            <div className={classes.comment}>
              <ReplyDisplay 
                username={e.username}
                body={e.body} 
                created_on={e.created_on} />
            </div>
            
          </div>
      )) : <div className={classes.gridItem} />}
      </div>
      <ReplyFormNew handleSubmit={handleSubmit}/>             
    </div>    
  );
}
