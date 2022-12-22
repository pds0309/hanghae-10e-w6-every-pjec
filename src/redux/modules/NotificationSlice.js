import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userNotificationApi from '../../apis/userNotificationApi';

const initialState = {
  notifications: [],
  isLoading: false,
  error: null,
};

export const __getNotifications = createAsyncThunk('getNotifications', async (_, thunkAPI) => {
  try {
    const result = await userNotificationApi.getNotifications();
    return thunkAPI.fulfillWithValue(result.data?.alerts);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    confirmAlert: (state, action) => {
      state.notifications = state.notifications.filter(noti => noti.alertId !== action.payload);
    },
  },
  extraReducers: {
    [__getNotifications.pending]: state => {
      state.isLoading = true;
    },
    [__getNotifications.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notifications = action.payload;
    },
    [__getNotifications.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { confirmAlert } = notificationSlice.actions;

export default notificationSlice;
