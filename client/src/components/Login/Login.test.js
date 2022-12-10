import React from 'react';
import Login from './Login';

import { render } from '@testing-library/react'

it('renders the login page correctly', () => {
  const { getByTestId } = render(
    <div>
      <Login />
    </div>)
  expect(getByTestId('saved')).toBeInTheDocument
});