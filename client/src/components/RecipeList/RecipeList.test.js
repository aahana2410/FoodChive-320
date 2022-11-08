import React from 'react';
import RecipeList from './RecipeList';

import { render } from '@testing-library/react'

it('renders recipe list correctly', () => {
  const { getByTestId } = render(
    <div>
      <RecipeList />
    </div>)
  expect(getByTestId('recipe-list')).toBeInTheDocument
});