import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, fireEvent, waitFor } from './test-providers';
import { setServer, server, rest } from './test-server';
import userEvent from '@testing-library/user-event'

import Login from '../features/dogfriends/pages/Login';

// import SignupForm from '../../features/dogfriends/components/SignupForm'

// beforeAll(() => {
//   setServer('/initinfo/', 200, 'Success', 'get');
// })
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())



// smoke and appearance tests 
// plus test if we can switch between login and signup screen inputs
test('renders Login ', async () => {
  render(<Login />);
  
  // Tab login button link is present
  const loginTab = screen.getAllByText(/login/i)[0];
  expect(loginTab).toBeInTheDocument();

  // Tab sign up button is present and can be fired
  const signUpTab = screen.getByText(/sign up/i);
  expect(signUpTab).toBeInTheDocument();
  await fireEvent.click(signUpTab);
  
  // After signUpTab button link is fired
  // page changes: Login => Sign Up
  // button changes: Submit => Next
  const nextButton = screen.getByRole('button', {'label': /next/i});
  expect(nextButton).toBeInTheDocument();

  // username TextField is present
  const usernameTextfield = screen.getByRole('textbox');
  expect(usernameTextfield).toBeInTheDocument();

  // password TextField is present
  const passwordTextfield = document.querySelector('#password');
  expect(passwordTextfield).toBeInTheDocument();

  // switch back to login mode/screen
  await fireEvent.click(loginTab);

  // After loginTab button link is fired
  // page changes: Sign Up => Login
  // button changes: Next => Submit
  const submitButton = screen.getByRole('button', {'label': /submit/i});
  expect(submitButton).toBeInTheDocument();

  // // can type a test username into username TextField
  // await userEvent.type(usernameTextfield, 'testusername');
  // // can expect username TextField to be populated with test username
  // expect(usernameTextfield.value).toBe('testusername');

  // // password TextField is present
  // const passwordTextfield = document.querySelector('#password');
  // expect(passwordTextfield).toBeInTheDocument();
  // // can type a test password into password TextField
  // await userEvent.type(passwordTextfield, 'testpassworD123');
  // // can expect password TextField to be populated with test password  
  // expect(passwordTextfield.value).toBe('testpassworD123');

  // // can fire Next button
  // await fireEvent.click(nextButton);

  
  
  
  // screen.logTestingPlaygroundURL()
});