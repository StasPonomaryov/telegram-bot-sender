import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessagePage from '../../app/message/page';
/**
 * Send message pahe tests:
 * 1. Must have h2 with specific text
 * 2. Must have specific form
 * 3. Must have specific radio buttons group
 * 4. Must have specific textarea
 * 5. Must have submit button
 */
describe('Message Page', () => {
  it('should render greetings heading', () => {
    render(<MessagePage />);
    const heading = screen.getByRole('heading', {
      name: /Відправити текстове повідомлення/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it('should render form', () => {
    render(<MessagePage />);
    const form = screen.getByRole('form', { title: /message form/i });

    expect(form).toBeInTheDocument();
  });
  it('should render submit button', async () => {
    render(<MessagePage />);
    const button = screen.getByRole('button', {
      name: /Старт/i,
    });

    expect(button).toBeInTheDocument();
  });
});
