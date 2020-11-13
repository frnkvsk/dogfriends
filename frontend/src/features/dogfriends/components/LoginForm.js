/** Login and Signup */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useFormInput } from '../hooks/useFormInput';
import { AuthContext } from '../context/AuthContext';
import FormInputOutlined from './FormInputOutlined';
import { login, getUserInfo } from '../api/DogfriendsApi';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '100vh',
    maxWidth: '700px',
    padding: '2px',
    height: '100vh',
  },
  form: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 20px 15px',
  },
  err: {
    color: '#ff1744',
    fontSize: '24px',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },

}));


export default function LoginForm() {
  const classes = useStyles();
  const history = useHistory();
  const username = useFormInput();
  const password = useFormInput('', 'password');
  const auth = useContext(AuthContext);
  // const [errorMessage, setErrorMessage] = useState(false);
  // const [usernameValue, setUsernameValue] = useState('username'); 
  // const [formState, setFormState] = useState("userInfo"); 

  // const handleChange = (e, newValue) => {
  //   setValue(newValue);
  // }

  const handleSubmitLogin = async () => {
    // setErrorMessage(false);
    try {
      // verify username and password are correct
      const resp = await login(username.value, password.value);
      // if logged in, use resp.token to get user information
      const userInfo = await getUserInfo({token: resp.data.token, username: username.value});
      auth.setAuthState({
        userInfo: userInfo.data.user,
        token: resp.data.token,
      });
      history.push(`/`);
    } catch (error) {
      // setErrorMessage(true);
      console.log(error)
    }     
  }
  
  return (
    <form className={classes.form}>
      <FormInputOutlined label='Username' formInput={username}/>
      <FormInputOutlined label='Password' formInput={password} />
      <div className={classes.button}>
        <Button variant="contained" color="primary" onClick={handleSubmitLogin}>Submit</Button>
      </div>
    </form>
  );
}
