import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../apis/postApi';

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  updateSuccess: false,
  deleteSuccess: false,
  error: null,
};

export const __getAllPosts = createAsyncThunk('getPosts', async (_, thunkAPI) => {
  try {
    const result = await postApi.getAll();
    return thunkAPI.fulfillWithValue(result.data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const __getPostById = createAsyncThunk('getPostById', async (payload, thunkAPI) => {
  try {
    const response = await postApi.getById(payload.postId);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const __deletePostById = createAsyncThunk('deletePost', async (payload, thunkAPI) => {
  try {
    await postApi.deleteById(payload.postId);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    initUpdateSuccess: state => {
      state.updateSuccess = false;
      state.error = null;
    },
    initDeleteSuccess: state => {
      state.deleteSuccess = false;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
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
    [__getPostById.pending]: state => {
      state.isLoading = true;
    },
    [__getPostById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getPostById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deletePostById.fulfilled]: state => {
      state.isLoading = false;
      state.deleteSuccess = true;
    },
    [__deletePostById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.deleteSuccess = false;
    },
  },
});

export const { initUpdateSuccess, initDeleteSuccess, clearError } = postSlice.actions;
export default postSlice;
