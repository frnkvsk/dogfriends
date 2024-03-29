import React, { useState, createContext } from 'react';

const PageInitContext = createContext();
const { Provider } = PageInitContext;

const PageInitProvider = ({ children }) => {
  const [pageInitState, setPageInitState] = useState({
    pageInitCount: 0,
  });
  const incrementInitCount = () => {
    try {
      setPageInitState({pageInitCount: pageInitState.pageInitCount + 1});
    } catch (error) {
      console.error(error);
    }    
  }
  const resetInitCount = () => {
    try {
      setPageInitState({pageInitCount: 0});
    } catch (error) {
      console.error(error);
    }    
  }
  
  return (
    <Provider
      value={
        {
          pageInitState,
          incrementInitCount: () => incrementInitCount(),
          resetInitCount: () => resetInitCount(),
        }
      }
      >
      {children}
    </Provider>
  )
}

export { PageInitContext, PageInitProvider };