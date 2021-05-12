import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

test('renders footer', () => {
  render(
    <Footer/>
  );

  const text = screen.getByText(/© BookSelf/i);
  expect(text).toBeInTheDocument();
});
