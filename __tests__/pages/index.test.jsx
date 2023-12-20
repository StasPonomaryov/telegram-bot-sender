import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../app/page';

describe('Home', () => {
  it('should render greetings heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Вітаю!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
