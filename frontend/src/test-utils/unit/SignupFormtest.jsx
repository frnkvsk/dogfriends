import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, fireEvent, act, waitFor, cleanup } from '../test-providers';
import { setServer, server, rest } from '../test-server';
import userEvent from '@testing-library/user-event'

import SignupForm from '../../features/dogfriends/components/SignupForm';

afterEach(cleanup);

const inUseUsername = 'inUseUsername';
const invalidUsernameMessage = 'Username is already taken';
const invalidPasswordMessage = 'Password must be 8\-30 characters in length and contain lowercase \[a\-z\], uppercase \[A\-Z\], numeric \[0\-9\]';
// const handleSignup = jest.fn((username, password,first_name,last_name,email,admin) => {
//   return [username, password,first_name,last_name,email,admin].every(e => String(e).length);
// });
// const handlePreSignup = ({username}) => {
//   // console.log('//////////////////////////////////////////////',username)
//   const data = { 
//     payload: {
//       resp: false 
//     }
//   };
//   if(username === inUseUsername) {
//     // console.log('------------------------------------------------',username,inUseUsername)
//     data.payload.resp = true;
//     return data.payload;
//   }
//   return data.payload;
// };

// smoke and appearance tests 
// test signup functionality
test('renders SignupForm ', async () => {    
  render(<SignupForm />);
  expect(true).toEqual(true);
});

test('username TextField is present', async () => {  
  render(<SignupForm />);
  let usernameTextfield = screen.getByTestId('username');
  expect(usernameTextfield).toBeInTheDocument();
});

test('password TextField is present', async () => {  
  render(<SignupForm />);
  let passwordTextfield = screen.getByTestId('password');
  expect(passwordTextfield).toBeInTheDocument();
});

test('next Button is present', async () => {  
  render(<SignupForm />);
  let nextButton = screen.getByRole('button', {'label': /next/i});
  expect(nextButton).toBeInTheDocument();
});

test('test a valid username that is NOT already in use', async () => {  
  render(<SignupForm />);
  let usernameTextfield = screen.getByTestId('username');
  fireEvent.change(usernameTextfield, {target: {value: 'notInUseUsername'}});  
  const res = await screen.queryAllByText(/Username is already taken\./i);
  expect(res.length).toEqual(0);
});

test('test a valid password that fullfills the criteria needed', async () => {  
  render(<SignupForm />);
  let passwordTextfield = screen.getByTestId('password');
  fireEvent.change(passwordTextfield, {target: {value: 'passWORD123'}});  
  expect(screen.queryByText(/Password must be 8\-30 characters in length and/i)).not.toBeInTheDocument();
});

test('test an invalid username that is already in use', async () => { 
  render(<SignupForm />);
  let usernameTextfield = screen.getByTestId('username');
  fireEvent.change(usernameTextfield, {target: {value: 'Henry'}});
  const res = await screen.findAllByText(/Username is already taken\./i);
  expect(res.length).toBe(1);
});

// test('test a invalid password that does NOT fullfill the criteria needed', async () => {  
//   render(<SignupForm />);  
//   let passwordTextfield = screen.getByTestId('password');
//   fireEvent.change(passwordTextfield, {target: {value: 'password'}});
//   const res = await screen.findAllByText(/Password must be 8\-30 characters in length and/i);
//   expect(res).toHaveLength(1);
// });

// test('can fire the next button', async () => {
//   render(<SignupForm />);
//   // enter valid username
//   let usernameTextfield = screen.getByTestId('username');
//   fireEvent.change(usernameTextfield, {target: {value: 'notInUseUsername'}}); 
//   // enter valid password
//   let passwordTextfield = screen.getByTestId('password');
//   fireEvent.change(passwordTextfield, {target: {value: 'passWORD123'}});
  
//   // first_name, last_name, email TextFields should NOT be in the document
//   expect(screen.queryByTestId('first_name')).not.toBeInTheDocument();
//   expect(screen.queryByTestId('last_name')).not.toBeInTheDocument();
//   expect(screen.queryByTestId('email')).not.toBeInTheDocument();

//   // fire next button
//   let nextButton = screen.getByRole('button', {'label': /next/i});
//   fireEvent.click(nextButton);

//   // first_name, last_name, email TextFields should be in the document
//   let firstNameTextfield = screen.getByTestId('first_name');
//   let lastNameTextfield = screen.getByTestId('last_name');
//   let emailTextfield = screen.getByTestId('email');
//   expect(firstNameTextfield).toBeInTheDocument();
//   expect(lastNameTextfield).toBeInTheDocument();
//   expect(emailTextfield).toBeInTheDocument();

//   // enter first_name, last_name
//   fireEvent.change(firstNameTextfield, {target: {value: 'testFirstName'}});
//   fireEvent.change(lastNameTextfield, {target: {value: 'testLastName'}});
//   expect(firstNameTextfield.value).toEqual('testFirstName');
//   expect(lastNameTextfield.value).toEqual('testLastName');

//   // enter invalid email
//   await fireEvent.change(emailTextfield, {target: {value: 'test@test'}});
//   expect(screen.queryByText('Email is not valid\.')).toBeInTheDocument();
//   // enter valid email
//   await fireEvent.change(emailTextfield, {target: {value: 'test@test.com'}});
//   expect(screen.queryByText('Email is not valid\.')).not.toBeInTheDocument();

//   // city, state, country TextFields should NOT be in the document
//   expect(screen.queryByTestId('city')).not.toBeInTheDocument();
//   expect(screen.queryByTestId('state')).not.toBeInTheDocument();
//   expect(screen.queryByTestId('country')).not.toBeInTheDocument();

//   // fire next button
//   fireEvent.click(nextButton);
//   // city, state, country TextFields should be in the document
//   let cityTextfield = screen.getByTestId('city');
//   let stateTextfield = screen.getByTestId('state');
//   let countryTextfield = screen.getByTestId('country');
//   expect(cityTextfield).toBeInTheDocument();
//   expect(stateTextfield).toBeInTheDocument();
//   expect(countryTextfield).toBeInTheDocument();

//   // enter city, state, country
//   await fireEvent.change(cityTextfield, {target: {value: 'testCity'}});
//   await fireEvent.change(stateTextfield, {target: {value: 'testState'}});
//   await fireEvent.change(countryTextfield, {target: {value: 'testCountry'}});
//   expect(cityTextfield.value).toEqual('testCity');
//   expect(stateTextfield.value).toEqual('testState');
//   expect(countryTextfield.value).toEqual('testCountry');

//   // fire Complete Signup button
//   fireEvent.click(nextButton);
//   // expect(screen.getByText('abcdefg')).toBeInTheDocument();
// });
  

  

 

  
  
  // screen.logTestingPlaygroundURL()





