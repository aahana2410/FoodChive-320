import React from 'react';
import Home from './Home';

import { render } from '@testing-library/react'

it('renders the Home page correctly', () => {
  const { getByTestId } = render(
    <div>
      <Home />
    </div>)
  expect(getByTestId('saved')).toBeInTheDocument
});