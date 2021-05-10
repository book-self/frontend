import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

