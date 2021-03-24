import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, fireEvent } from '../../test-utils/test-providers';

import Home from '../../features/dogfriends/pages/Home';

// smoke and appearance tests
test('renders Home ', async () => {
  render(<Home />);
  
  // home screen greeting is present
  expect(screen.getAllByText(/Share your dog photos with other dog friends/i)[0]).toBeInTheDocument();

  // placeholder, for <PostList /> not being available, is present
  expect(screen.getAllByText(/Sorry, our free server is sleeping.../i)[0]).toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});