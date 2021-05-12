import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './components/Counter/counterSlice';
import tokenReducer from './store/Token/TokenSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenReducer
  },
});