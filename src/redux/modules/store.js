import { configureStore } from '@reduxjs/toolkit';
import comments from './commentsSlice';

const store = configureStore({
  reducer: { comments },
});

export default store;
