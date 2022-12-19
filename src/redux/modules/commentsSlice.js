import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import commentApi from '../../apis/commentApi';

export const __postComment = createAsyncThunk('postComment', async (payload, thunkAPI) => {
  try {
    // await commentApi.submit(payload); //됐다고 치기
    return thunkAPI.fulfillWithValue({ ...payload });
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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: {
    [__postComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      //나머지 속성 채우기
      state.comments = [action.payload, ...state.comments];
      console.log(state.comments);
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
