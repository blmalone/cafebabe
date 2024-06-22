/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from './banner';

describe('Banner', () => {
  it('should render banner with guide link', () => {
    render(<Banner pageName="Buy me a coffee" pageUrl="buy-me-coffee" />);
  });

  it('should render banner with correct text', () => {
    render(<Banner pageName="Buy me a coffee" pageUrl="buy-me-coffee" />);
    expect(screen.getByText('Step into the Buy me a coffee experience.')).toBeInTheDocument();
  });
});
