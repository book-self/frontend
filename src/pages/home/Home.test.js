import { render, screen } from '@testing-library/react';
import { Home } from './Home';

test('renders learn react link', () => {
  render(
    <Home/>
  );

  const link = screen.getByText(/learn react/i);
  expect(link).toBeInTheDocument();
});
