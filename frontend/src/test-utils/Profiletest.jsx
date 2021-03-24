import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, fireEvent } from '../../test-utils/test-providers';
// import { setServer, server, rest } from '../../test-utils/test-server';

import Profile from '../../features/dogfriends/pages/Profile';

// beforeAll(() => {
//   setServer('/initinfo/', 200, 'Success', 'get');
// })
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// smoke and appearance tests
test('renders Profile ', async () => {
  render(<Profile />);
  
  // home screen greeting is present
  expect(screen.getByText(/edit profile/i)).toBeInTheDocument();
  expect(screen.getByText(/done/i)).toBeInTheDocument();
  expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  expect(screen.getByText(/change/i)).toBeInTheDocument();
  // expect(screen.getByRole('button', {'label': /done/i})).toBeInTheDocument();
  // expect(screen.getByRole('button', {'label': /cancel/i})).toBeInTheDocument();
  // expect(screen.getByRole('button', {'label': /change/i})).toBeInTheDocument();

  // // Navbar about us button link is present
  // expect(screen.getByText(/about us/i)).toBeInTheDocument();
  // // Navbar about us button link can be fired
  // await fireEvent.click(screen.getByText(/about us/i));

  // // After Navbar about us button link fired,  
  // // page changes: Home => About Us
  // expect(screen.getByText(/our mission/i)).toBeInTheDocument();
  // expect(screen.getByText(/our status/i)).toBeInTheDocument();
  // expect(screen.getByText(/our future/i)).toBeInTheDocument();
  // expect(screen.getByText(/our promise/i)).toBeInTheDocument();

  // // Navbar home button link is present
  // expect(screen.getByText(/home/i)).toBeInTheDocument();
  // // Navbar home button link can be fired
  // await fireEvent.click(screen.getByText(/home/i));
  // // page changes: About Us => Home
  // expect(screen.getAllByText(/Share your dog photos with other dog friends/i)[0]).toBeInTheDocument();
});