import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../apis/userApi';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const __getMyProfile = createAsyncThunk('fetchComments', async (_, thunkAPI) => {
  try {
    const { data } = await userApi.me();
    return thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [__getMyProfile.pending]: state => {
      state.isLoading = true;
    },
    [__getMyProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__getMyProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const { } = userSlice.actions;

export default userSlice;
