import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';

import { render, screen, fireEvent, cleanup, act, waitFor } from '../../test-utils/test-providers';
import { server } from '../../test-utils/test-server';
import TestData from '../../test-utils/test-data';

import App from '../../App';

import { useUserInfo } from '../../features/dogfriends/hooks/useUserInfo';

beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())


// smoke and appearance tests
test('login functionality', async () => {

  render(<App />);

  const { result } = renderHook(useUserInfo)

  // home screen greeting is present
  expect(screen.getAllByText(/Share your dog photos with other dog friends/i)[0]).toBeInTheDocument();

  // Navbar about us button link is present
  const loginButton = screen.getByText(/login/i);
  expect(loginButton).toBeInTheDocument();
  // Navbar login button link can be fired
  await fireEvent.click(loginButton);

  // After Navbar login button link fired,  
  // page changes: Home => Login
  // Tab login button link is present
  const loginTab = screen.getByTestId('login');
  expect(loginTab).toBeInTheDocument();

  // Tab sign up button is present and can be fired
  const signUpTab = screen.getByTestId('signup');
  expect(signUpTab).toBeInTheDocument();
  
  // username and password TextFields are present
  const usernameTextfield = screen.getByTestId('username');
  expect(usernameTextfield).toBeInTheDocument();
  const passwordTextfield = screen.getByTestId('password');
  expect(passwordTextfield).toBeInTheDocument();

  // enter first_name, last_name
  fireEvent.change(usernameTextfield, {target: {value: TestData.user2.username}});
  fireEvent.change(passwordTextfield, {target: {value: TestData.user2.password}});
  // // enter first_name, last_name
  // fireEvent.change(usernameTextfield, {target: {value: "TestData.user2.username"}});
  // fireEvent.change(passwordTextfield, {target: {value: "TestData.user2.password"}});

  // Submit button is present
  const submitButton = screen.getByText(/submit/i);
  // let submitButton = screen.getByRole('button', {'label': /submit/i});
  expect(submitButton).toBeInTheDocument();
  expect(usernameTextfield.value).toBe(TestData.user2.username)
  expect(passwordTextfield.value).toBe(TestData.user2.password)
  // fireEvent.click(submitButton);
  // fire Submit button
  act( () => {
    fireEvent.click(submitButton);
  });  

  // let errorMessage;
  // await waitFor(() => {
  //   errorMessage = screen.findByText(/Error\: Invalid Login Credentials/i);
    
    
  // },{ waitForOptions: {timeout: 2000 } });
  // await waitFor(async () => {
   
    
    
  // },{ waitForOptions: {timeout: 2000 } });
  // let em = await errorMessage;
  // console.log('errorMessage',em)
  //.toBeInTheDocument();
  // const errorMessage = await screen.findByText(/Error\: Invalid Login Credentials/i);
  // expect(errorMessage).toBeInTheDocument();

  // const errorMessage = await screen.findByText(/Error\: Invalid Login Credentials/i);
  // // console.log('errorMessage',errorMessage)
  // expect(errorMessage).toBeInTheDocument();

  // const welcomeText = await screen.findByText(`Welcome back ${TestData.user1.username}`);
  // expect(welcomeText).toBeInTheDocument();
  // console.log('welcomeText',welcomeText)
  // expect(welcomeText[0]).toEqual('true');

});