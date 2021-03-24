import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, fireEvent, act } from '../test-providers';
import { setServer, server, rest } from '../test-server';
import userEvent from '@testing-library/user-event'

import LoginForm from '../../features/dogfriends/components/LoginForm';

// smoke and appearance tests 
// test login functionality
test('renders Login ', async () => {

  const handleLogin = jest.fn(() => true);
  
  // const valid = await handleLogin({username, password});
  render(<LoginForm handleLogin={handleLogin}/>);
  
  // username TextField is present
  const usernameTextfield = screen.getByRole('textbox');
  expect(usernameTextfield).toBeInTheDocument();

  // password TextField is present
  const passwordTextfield = document.querySelector('#password');
  expect(passwordTextfield).toBeInTheDocument();

  // submit Button is present
  const submitButton = screen.getByRole('button', {'label': /submit/i});
  expect(submitButton).toBeInTheDocument();

  // can type a test username into username TextField
  await userEvent.type(usernameTextfield, 'testusername');
  // can expect username TextField to be populated with test username
  expect(usernameTextfield.value).toBe('testusername');

  // can type a test password into password TextField
  await userEvent.type(passwordTextfield, 'testpassword123');
  // can expect password TextField to be populated with test password  
  expect(passwordTextfield.value).toBe('testpassword123');

  // can fire Next button
  act(() => {
    fireEvent.click(submitButton);
  });
  // can expect handleLogin function to be called with values of username and password input fields
  expect(handleLogin).toHaveBeenCalledWith(
    {
      username: 'testusername', 
      password: 'testpassword123'
    }
  );  
  
  // screen.logTestingPlaygroundURL()
});