import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentApi from '../../apis/commentApi';

export const __postComment = createAsyncThunk('postComment', async (payload, thunkAPI) => {
  try {
    const { postId, comment } = payload;
    const { data } = await commentApi.submit(postId, { comment });
    return thunkAPI.fulfillWithValue({ ...payload, commentId: data.commentId });
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const __fetchComments = createAsyncThunk('fetchComments', async (payload, thunkAPI) => {
  try {
    const { data } = await commentApi.getAllForPost(payload);
    return thunkAPI.fulfillWithValue(data?.commentList ?? data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const __editComment = createAsyncThunk('editComment', async (payload, thunkAPI) => {
  try {
    const { commentId, comment } = payload;
    await commentApi.updateById(commentId, { comment });
    return thunkAPI.fulfillWithValue(payload);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const __deleteComment = createAsyncThunk('deleteComment', async (payload, thunkAPI) => {
  try {
    await commentApi.deleteById(payload);
    return thunkAPI.fulfillWithValue(payload);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const initialState = {
  comments: [],
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
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.map(e => ({
        ...e,
        comment: e.commentId === action.payload.commentId ? action.payload.comment : e.comment,
      }));
    },
    [__editComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(comment => comment.commentId !== action.payload);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default CommentSlice;
