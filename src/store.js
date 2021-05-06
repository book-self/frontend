import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './components/counter/counterSlice';
import booklistReducer from './components/bookList/bookListDisplay/bookListSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    booklistdisplay: booklistReducer

  },
});
