import React, { useEffect, useContext } from 'react';
import { 
  useSelector,
  useDispatch 
} from 'react-redux';
import { useParams } from 'react-router';
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
    width: '100%',
    minWidth: '350px',    
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
  },
  comment: {
    width: 'auto',
    border: '1px solid #eeeeee',
  },
  noreplies: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    fontSize: 16,
    border: '1px solid #eeeeee',
  }
}));

export default function RepliesList() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { parent_id } = useParams();
  const dispatch = useDispatch();  
  const selectList = useSelector(selectReplies);

  useEffect(() => {
    dispatch(getRepliesDataById(parent_id));   
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
      // update replies list
      dispatch(getRepliesDataById(parent_id));
    }    
  };

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
      )) : <div className={classes.noreplies}>No replies yet.</div>}
      </div>
      {auth.authState.userInfo.username && auth.authState.userInfo.username.length ?         
        <ReplyFormNew handleSubmit={handleSubmit}/>
        : ''
      }             
    </div>
  );
}
