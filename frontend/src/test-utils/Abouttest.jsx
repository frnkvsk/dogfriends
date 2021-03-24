import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, fireEvent } from './test-providers';

import About from '../features/dogfriends/pages/About';

// smoke and appearance tests
test('renders About ', async () => {
  render(<About />);  

  // About Us page display is present
  expect(screen.getByText(/our mission/i)).toBeInTheDocument();
  expect(screen.getByText(/our status/i)).toBeInTheDocument();
  expect(screen.getByText(/our future/i)).toBeInTheDocument();
  expect(screen.getByText(/our promise/i)).toBeInTheDocument();
});