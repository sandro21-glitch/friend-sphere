import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, database } from "../../config/firebase";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserData } from "./userTypes";
import { nanoid } from "nanoid";
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from "../store";

// Define async thunk to register user
export interface userFormData {
  name: string;
  email: string;
  password: string;
}
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: userFormData, { rejectWithValue }) => {
    const { email, password, name } = userData;

    if (!email) {
      return rejectWithValue("Email is required");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = userCredential.user;

      const userProfile: UserData = {
        uid: nanoid(),
        email,
        password,
        name,
        followers: [],
        following: [],
        registeredDate: new Date().toISOString(),
        joinedGroups: [],
      };

      await set(ref(database, `users/${uid}`), userProfile);

      return userProfile;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

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
