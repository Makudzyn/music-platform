import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "@/lib/defenitions";
import { loadCurrentUser, loadUserById } from "@/lib/redux/userReducer/userActions";

type UserState = {
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  users: [],
  loading: false,
  error: null
};


const userSlice = createSlice<UserState, {}>({
  name: 'user',
  initialState,
  reducers: {
    // Экшен для установки данных пользователя при авторизации
    loginSuccess: (state, action: PayloadAction<Partial<User>>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    // Экшен для выхода из аккаунта
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
  extraReducers: builder => {
    builder
    .addCase(loadCurrentUser.pending, state => {
      state.loading = true;
    })
    .addCase(loadCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    })
    .addCase(loadCurrentUser.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        state.error = typeof action.error.message === 'string'
          ? action.error.message
          : 'Failed to load user data';
      }
      state.isAuthenticated = false;
    })
    .addCase(loadUserById.pending, state => {
      state.loading = true;
    })
    .addCase(loadUserById.fulfilled, (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.loading = false;
    })
    .addCase(loadUserById.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        state.error = typeof action.error.message === 'string'
          ? action.error.message
          : 'Failed to load user data';
      }
    })
  }
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
