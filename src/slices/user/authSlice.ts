import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./userTypes";
import {
  loginDemoUser,
  loginUser,
  registerUser,
  signOutUser,
} from "./authThunks";
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from "../store";

interface AuthState {
  userData: UserType | null;
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
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    //register
    builder
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.userData = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        const authError = action.payload as string;
        state.error =
          authError.replace("Firebase", "") || "Registration failed";
        state.loading = false;
      });
    //login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ userProfile: UserType }>) => {
          state.userData = action.payload.userProfile;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        const authError = action.payload as string;
        state.error = authError.replace("Firebase", "") || "Login failed";
        state.loading = false;
      });
    //LOGIN DEMO USER
    builder
      .addCase(loginDemoUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginDemoUser.fulfilled, (state, action) => {
        state.userData = action.payload.userProfile;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginDemoUser.rejected, (state, action) => {
        const authError = action.payload as string;
        state.error = authError.replace("Firebase", "") || "Login failed";
        state.loading = false;
      })
      // Sign Out User
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.userData = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "something went wrong";
      });
  },
});

export const { setUser } = authSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
