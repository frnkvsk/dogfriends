import React, { useContext } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks'

import { render, screen, fireEvent, cleanup, act, waitFor } from '../test-providers';
import { server } from '../test-server';

import Login from '../../features/dogfriends/pages/Login';

import TestData from '../test-data';

beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())


// smoke and appearance tests
test('renders Login ', async () => {

  
  render( <Login /> );

  // Tab login button link is present
  const loginTab = screen.getAllByText(/login/i)[0];
  expect(loginTab).toBeInTheDocument();

  // Tab sign up button is present and can be fired
  const signUpTab = screen.getByText(/sign up/i);
  expect(signUpTab).toBeInTheDocument();
  // await fireEvent.click(signUpTab);

  // username and password TextFields are present
  const usernameTextfield = screen.getByTestId('username');
  expect(usernameTextfield).toBeInTheDocument();
  const passwordTextfield = screen.getByTestId('password');
  expect(passwordTextfield).toBeInTheDocument();

  // enter first_name, last_name
  fireEvent.change(usernameTextfield, {target: {value: TestData.user2.username}});
  fireEvent.change(passwordTextfield, {target: {value: TestData.user2.password}});

  // Submit button is present
  let submitButton = screen.getByText(/submit/i);
  // let submitButton = screen.getByRole('button', {'label': /submit/i});
  expect(submitButton).toBeInTheDocument();

  // fire Submit button
  act(() => {
    fireEvent.click(submitButton);
  });  

  expect(loginTab).toBeInTheDocument();
  // expect(auth.authState.token).toEqual(TestData.user1._token)
  // expect(localStorage.setItem).toBeCalledWith('token');
  // expect(localStorage.setItem).toBeCalledWith('token')
  // or
  // expect(localStorage.setItem.mock.calls.length).toBe(1)

});