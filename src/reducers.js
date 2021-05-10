import { combineReducers} from '@reduxjs/toolkit';

import counterReducer from './components/counter/counterSlice';
import booklistReducer from './components/bookList/bookListDisplay/bookListSlice'

const rootReducer = combineReducers({
  
    counter: counterReducer,
    booklistdisplay: booklistReducer


});
export default rootReducer;
