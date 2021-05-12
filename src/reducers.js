import { combineReducers } from '@reduxjs/toolkit';

import booklistReducer from './components/bookList/bookListDisplay/bookListSlice'

const rootReducer = combineReducers({
    booklistdisplay: booklistReducer
});


export default rootReducer;
