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
  comments: [
    {
      id: 1,
      commentId: 1,
      postId: 1,
      userId: 1,
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
      console.log(state.comments);
      //다른 속성도 채우기
      //서버에서 지정한 commentId가 뭔지 새로고침 전에 모르겠음 => 새로운 댓글 등록 시 새로고침 없이 수정/삭제가 안됨
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload.reverse();
    },
    [__fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editComment.fulfilled]: (state, action) => {
      console.log(action.payload);
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
