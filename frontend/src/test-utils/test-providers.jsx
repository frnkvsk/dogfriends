import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import store from '../app/store';
import { AuthProvider } from '../features/dogfriends/context/AuthContext';
import { PageInitProvider } from '../features/dogfriends/context/PageInitContext';

const AllTheProviders = (children, route) => {
  const history = createMemoryHistory();
  history.push(route);
  return render(
    <Router history={history}>
      <Provider store={store}>
        <AuthProvider>
          <PageInitProvider>
            {children}
          </PageInitProvider>          
        </AuthProvider>    
      </Provider>
    </Router>        
    // <Router history={history}>
    //   <Provider store={store}>
    //     <AuthProvider>
    //       <PageInitProvider>
    //         {children}
    //       </PageInitProvider>          
    //     </AuthProvider>    
    //   </Provider>
    // </Router>        
  );  
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { AllTheProviders as render }

// const customRender = (ui, options) =>
//   render(ui, { wrapper: AllTheProviders, ...options })

// // re-export everything
// export * from '@testing-library/react'

// // override render method
// export { customRender as render }