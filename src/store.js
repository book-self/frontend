import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './components/counter/counterSlice';
import singelbookdisplayReducer from './components/bookList/singleBookDisplay/singleBookDisplaySlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    singlebookdisplay: singelbookdisplayReducer,

  },
});
