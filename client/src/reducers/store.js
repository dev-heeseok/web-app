import { configureStore } from '@reduxjs/toolkit'
import userReducers from './userReducers';

const reducer = {
  user: userReducers,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',

});

export default store;