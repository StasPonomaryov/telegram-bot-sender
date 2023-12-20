import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImagePage from '../../app/image/page';

describe('Image Page', () => {
  it('should render greetings heading', () => {
    render(<ImagePage />);

    const heading = screen.getByRole('heading', {
      name: /Відправити малюнок або фото/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
