import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentApi from '../../apis/commentApi';

export const __postComment = createAsyncThunk('postComment', async (payload, thunkAPI) => {
  try {
    const { postId, comment } = payload;
    await commentApi.submit(postId, { comment });
    return thunkAPI.fulfillWithValue(payload);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const __fetchComments = createAsyncThunk('fetchComments', async (payload, thunkAPI) => {
  try {
    const { data } = await commentApi.getAllForPost(payload);
    return thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const initialState = {
  comments: [
    {
      id: 1,
      commentId: 1,
      postId: 1,
      comment: '해치움',
      createdAt: '2022-12-19T00:18:32.760Z',
    },
  ],
  isLoading: false,
  error: null,
};

const CommentSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: {
    [__postComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = [action.payload, ...state.comments];
      //다른 속성도 채우기
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state = { ...state, comments: action.payload };
      console.log(state);
    },
    [__fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default CommentSlice;
