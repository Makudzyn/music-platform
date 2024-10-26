import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определение типа состояния авторизации
interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
}

// Начальное состояние
const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
};

// Создание слайса для авторизации
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Экшен для установки данных пользователя при авторизации
    loginSuccess: (state, action: PayloadAction<{ role: string }>) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    // Экшен для выхода из аккаунта
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
    updateRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    }
  },
});

// Экспорты экшенов и редюсера
export const { loginSuccess, logout, updateRole } = authSlice.actions;
export default authSlice.reducer;
