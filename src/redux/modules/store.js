import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './UserSlice';
import commentsSlice from './commentsSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  comments: commentsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
