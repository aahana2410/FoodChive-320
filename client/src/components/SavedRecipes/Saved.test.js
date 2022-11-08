import React from 'react';
import Saved from './Saved';

import { render } from '@testing-library/react'

it('renders the saved recipes page correctly', () => {
  const { getByTestId } = render(
    <div>
      <Saved />
    </div>)
  expect(getByTestId('saved')).toBeInTheDocument
});