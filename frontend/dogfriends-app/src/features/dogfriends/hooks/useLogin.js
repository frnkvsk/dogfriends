import { useState } from 'react';

const useLogin = () => {
  let ls = JSON.parse(localStorage.getItem("token")) || "";
  const [token, setToken] = useState(ls);

  const setTokenStorage = (newToken) => { 
    setToken(newToken);
    localStorage.setItem("token", JSON.stringify(newToken) || "");
  }
  return {token, setTokenStorage};
}

export { useLogin };