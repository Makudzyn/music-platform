import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@lib/store';
import { User } from '@lib/defenitions';
import { fetchUserById } from '@/app/services/userService';
import { AxiosError } from "axios";

export const loadUserById = createAsyncThunk<
  User,
  string,
  { state: RootState }
>(
  'user/loadUserById',
  async (userId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const existingUser = state.user.users.find((user) => user._id === userId);
      if (existingUser) return existingUser;
      return await fetchUserById(userId);
    } catch (error) {
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message ||
          error.message ||
          'User loading error';
      } else errorMessage = 'An unexpected error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);

export const loadCurrentUser = createAsyncThunk<User, string>(
  'user/loadCurrentUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await fetchUserById(userId);
    } catch (error) {
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message ||
          error.message ||
          'User loading error';
      } else errorMessage = 'An unexpected error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);
