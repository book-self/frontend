import { applyMiddleware, combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'



export const store = createStore(rootReducer);