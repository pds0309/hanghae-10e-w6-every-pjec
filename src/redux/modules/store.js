import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './UserSlice';
import CommentSlice from './CommentSlice';
import { postSlice } from './PostSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  comments: CommentSlice.reducer,
  posts: postSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
