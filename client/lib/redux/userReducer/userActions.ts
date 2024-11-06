import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { User } from '@/lib/defenitions';
import { fetchUserById } from '@/app/services/userService';

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
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const loadCurrentUser = createAsyncThunk<User, string>(
  'user/loadCurrentUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await fetchUserById(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
