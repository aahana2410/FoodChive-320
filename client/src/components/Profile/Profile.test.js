import React from 'react';
import Profile from './Profile';

import { render } from '@testing-library/react'

it('renders the profile page correctly', () => {
  const { getByTestId } = render(
    <div>
      <Profile />
    </div>)
  expect(getByTestId('saved')).toBeInTheDocument
});