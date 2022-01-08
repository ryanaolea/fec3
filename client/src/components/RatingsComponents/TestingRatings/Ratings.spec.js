import React from 'react';
import { render, screen } from '@testing-library/react';
import { metadata, reviews, product } from './sampleData.js';
import Ratings from '../../Ratings.jsx';

describe('My Test Suite', () => {
  it('displays all mini modules in Ratings and Reviews', () => {
    const app = render(<Ratings product_Id={product.id} productName={product.name}/>);
    expect(document.querySelector('.reviews-sidebar')).toBeInTheDocument();
  });

  it('my test test case', () => {
    expect(true).toEqual(true);
  });

});
