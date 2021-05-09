import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

test('renders 404', () => {
  render(
    <NotFound/>
  );

  const text = screen.getByText(/404/i);
  expect(text).toBeInTheDocument();
});
