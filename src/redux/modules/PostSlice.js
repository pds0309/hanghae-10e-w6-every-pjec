import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../apis/postApi';

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  error: null,
};

export const __getAllPosts = createAsyncThunk('posts', async (_, thunkAPI) => {
  try {
    const result = await postApi.getAll();
    return thunkAPI.fulfillWithValue(result.data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    login: state => {
      state.isLogined = true;
    },
    logout: state => {
      state.user = null;
      state.isLogined = false;
    },
  },
  extraReducers: {
    [__getAllPosts.pending]: state => {
      state.isLoading = true;
    },
    [__getAllPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getAllPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {  } = postSlice.actions;

export default postSlice;
