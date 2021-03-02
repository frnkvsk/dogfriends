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
  
  return (
    <Provider
      value={
        {
          pageInitState,
          incrementInitCount: () => incrementInitCount(),
        }
      }
      >
      {children}
    </Provider>
  )
}

export { PageInitContext, PageInitProvider };