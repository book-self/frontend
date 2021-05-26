import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';

test('renders 404', () => {
  render(
    <NotFound/>
  );

  const text = screen.getByText(/404 Not Found/i);
  expect(text).toBeInTheDocument();
});
