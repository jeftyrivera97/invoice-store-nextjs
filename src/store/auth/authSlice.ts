import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definir interfaces para el estado de autenticación
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  status: "not-authenticated" | "checking" | "authenticated";
  user: User | null;
  errorMessage: string | null;
}
const initialState: AuthState = {
  status: "checking",
  user: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = null;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = null;
    },
    onLoginWindow: (state) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    onErrorLogin: (state, action: PayloadAction<string>) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  onErrorLogin,
  onLoginWindow,
} = authSlice.actions;

export default authSlice.reducer;

export type { AuthState, User };