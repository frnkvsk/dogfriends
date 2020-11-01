import { useState } from 'react';

const useUserInfo = () => {
  let ls = JSON.parse(localStorage.getItem("userInfo")) || "";
  const [userInfo, setUserInfo] = useState(ls);
  const setUserInfoStorage = (newUserInfo) => { 
    setUserInfo(newUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo) || "");
  };
  return {userInfo, setUserInfoStorage};
}

export { useUserInfo };