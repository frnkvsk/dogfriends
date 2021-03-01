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
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
    width: '97%',
    padding: '0',
    margin: '0',
    // height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    
    width: '100%',
    // margin: '3px 0 2px 0',
    // padding: '3px',
    // border: '1px solid #eeeeee',
  },
  control: {
    display: 'flex',    
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formItem: {
    margin: '3px 0 7px 0',
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