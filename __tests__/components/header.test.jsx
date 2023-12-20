import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../app/components/Header';

describe('Header', () => {
  it('should render a heading', () => {
    render(<Header />);

    const heading = screen.getByRole('list');

    expect(heading).toBeInTheDocument();
  });
});
