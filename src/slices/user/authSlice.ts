import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "./userTypes";
import { registerUser } from "./userThunks";
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from "../store";

// Define async thunk to register user

interface AuthState {
  userData: UserData | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: AuthState = {
  userData: null,
  loading: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        const authError = action.payload as string;
        state.error =
          authError.replace("Firebase", "") || "Registration failed";
        state.loading = false;
      });
  },
});

export const {} = authSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
