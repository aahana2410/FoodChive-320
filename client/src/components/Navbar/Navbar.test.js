import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Navbar from './Navbar';

import { render } from '@testing-library/react'

it('renders navbar correctly', () => {
  const { getByTestId } = render(
    <div>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </div>)
  expect(getByTestId('navbar')).toBeInTheDocument
});