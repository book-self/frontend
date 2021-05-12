import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './store/Token/TokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer
  },
});