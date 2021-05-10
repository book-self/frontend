import { applyMiddleware, combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'

import counterReducer from './components/counter/counterSlice';
import booklistReducer from './components/bookList/bookListDisplay/bookListSlice'

export const store = combineReducers({
  
    counter: counterReducer,
    booklistdisplay: booklistReducer


});

