import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  TextField,
} from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0',
    margin: '0',
    // height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    
    width: '400px',
    margin: '3px 0 2px 0',
    padding: '8px',
    border: '2px solid #eceff1',
  },
  control: {
    display: 'flex',    
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formItem: {
    margin: '5px 0 5px 0',
  },

}));

const ReplyFormNew = ({handleSubmit}) => {
  const classes = useStyles();
  // const auth = useContext(AuthContext);
  // const dispatch = useDispatch();  
  const [body, setBody] = useState('');
  const [bodyValid, setBodyValid] = useState('');

  
  // validate body
  useEffect(() => {
    if([...body].filter(e => e!==' ').length > 120) {
      setBodyValid('Body text must be betwen 1 and 120 characters in length.');
    } else {
      setBodyValid('');
    }
  }, [body]);

  // const handleSubmit = useCallback((e) => {
  //   // e.preventDefault();
  //   console.log('ReplyFormNew parent_id',parent_id)
  //   if(body) {      
  //     const payload = {
  //       parent_id,
  //       body,
  //       username: auth.authState.userInfo.username,
  //       _token: auth.authState.token
  //     }
  //     // commit reply details to database
  //     dispatch(addNewReply(payload)); 
  //     setBody('');
  //   }
  //   // eslint-disable-next-line
  // }, [body]) 
  // e => {   
  //   e.preventDefault();
  //   console.log('ReplyFormNew parent_id',parent_id)
  //   if(body) {      
  //     const payload = {
  //       parent_id,
  //       body,
  //       username: auth.authState.userInfo.username,
  //       _token: auth.authState.token
  //     }
  //     // commit reply details to database
  //     dispatch(addNewReply(payload)); 
  //     setBody('');
  //   }      
  // }
  const handleButtonClick = () => {
    if(body) {
      handleSubmit(body);
      setBody('');
    }
  }
  return (
    <div className={classes.root}> 
      <form method='post' className={classes.form}>          
        <div className={classes.control}>           
          <TextField 
            className={classes.formItem}
            multiline={true}
            rows='2'
            label='Reply' 
            variant='outlined' 
            value={body}
            error={bodyValid.length ? true : false}
            helperText={bodyValid.length ? bodyValid : ''}
            onChange={e => setBody(e.target.value)} />            
        </div>        
        <div className={classes.buttons}>
          <Button 
            className={classes.formItem} 
            variant='contained' 
            color='primary' 
            onClick={handleButtonClick} >
            Send
          </Button>
        </div>      
      </form>
      
    </div>
  );
}

export default ReplyFormNew;