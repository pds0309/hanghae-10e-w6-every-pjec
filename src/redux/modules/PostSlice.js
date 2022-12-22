import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../apis/postApi';

// 1. 초기 데이터 형태
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
    return thunkAPI.fulfillWithValue(result.data?.postList ?? result.data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const __getPostById = createAsyncThunk('getPostById', async (payload, thunkAPI) => {
  try {
    const result = await postApi.getById(payload.postId);
    return thunkAPI.fulfillWithValue(result.data?.postOne ?? result.data);
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

export const __myPostById = createAsyncThunk('myPost', async (_, thunkAPI) => {
  // 2. 함수로 들어왔는지 콘솔 찍어보기
  try {
    // 3. try문으로 들어오는지 또 콘솔 찍어보기
    const { data } = await postApi.getMyPosts();
    // 4. 데이터 잘 받아왔는지 콘솔 찍어보기
    // 데이터 타입이 object이면 . . . 쓰면서 쭉쭉 들어가면 됨
    return thunkAPI.fulfillWithValue(data.mePost);
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
    }, // 5. 데이터를 받아오는 중, 받음, 에러 떴을때를 나눠서 상태 관리해주기
    [__myPostById.pending]: state => {
      state.isLoading = true;
    },
    [__myPostById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      // 6. 데이터가 상태값으로 잘 들어갔는지 콘솔로 확인하기
    },
    [__myPostById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { initUpdateSuccess, initDeleteSuccess, clearError } = postSlice.actions;
export default postSlice;
