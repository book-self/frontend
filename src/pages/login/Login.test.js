import { render, screen } from '@testing-library/react';
import { Login } from './Login';

test('renders Login', () => {
  render(
    <Login/>
  );

  const text = screen.getByText(/Login/i);
  expect(text).toBeInTheDocument();
});
