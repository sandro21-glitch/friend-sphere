import { createSlice } from "@reduxjs/toolkit";
import { updateUserProfile } from "./userDataThunks";
import { UserData } from "./userTypes";
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from "../store";

interface UserDataState {
  loading: boolean | null;
  error: string | null;
  getAllUser: UserData[] | null;
}

const initialState: UserDataState = {
  loading: null,
  error: null,
  getAllUser: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Failed to update user profile";
        state.loading = false;
      });
  },
});

export const {} = userDataSlice.actions;

export default userDataSlice.reducer;
