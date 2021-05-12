import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { SignIn } from './SignIn';

test('renders Login', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignIn/>
      </BrowserRouter>
    </Provider>
  );

  const text = screen.getAllByText(/Sign In/i);

  for(var i=0; i < text.length; i++){
    expect(text[i]).toBeInTheDocument();
  }
});
