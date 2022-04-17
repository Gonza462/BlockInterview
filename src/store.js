import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/actions/countSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
