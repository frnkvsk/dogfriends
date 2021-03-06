import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  TextField,
} from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '97%',
    padding: '0',
    margin: '0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',    
    width: '100%',
  },
  control: {
    display: 'flex',    
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formItem: {
    margin: '3px 0 7px 0',
  },
  button: {
    width: '100%',
    margin: '5px 0 5px 0',
  }
}));

const ReplyFormNew = ({handleSubmit}) => {
  const classes = useStyles();
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
        <Button 
          className={classes.button} 
          variant='contained' 
          color='primary' 
          onClick={handleButtonClick} >
          Send
        </Button>
      </form>
      
    </div>
  );
}

export default ReplyFormNew;