import React, { useState, createContext } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useUserInfo } from '../hooks/useUserInfo';
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const { token, setTokenStorage } = useLogin();
  const { userInfo, setUserInfoStorage } = useUserInfo();
  const [authState, setAuthState] = useState({
    token: token,
    userInfo: userInfo,
  });
  const setAuthInfo = ({ token, userInfo }) => {
    try {
      setTokenStorage(token);
      setUserInfoStorage(userInfo);
      setAuthState({
        token,
        userInfo,      
      });
    } catch (error) {
      console.error(error);
    }    
  }
  
  return (
    <Provider
      value={
        {
          authState,
          setAuthState: authInfo => setAuthInfo(authInfo),
        }
      }
      >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider };