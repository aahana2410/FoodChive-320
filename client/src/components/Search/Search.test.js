import React from 'react';
import Search from './Search';

import { render } from '@testing-library/react'

it('renders searchbar correctly', () => {
  const { getByTestId } = render(
    <div>
      <Search />
    </div>)
  expect(getByTestId('search')).toBeInTheDocument
});