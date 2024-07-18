import { createSlice } from "@reduxjs/toolkit";
import { fetchTopUsers, updateUserProfile } from "./userDataThunks";
import { TopUserTypes } from "./userTypes";
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from "../store";

interface UserDataState {
  loading: {
    updatingUserProfile: boolean;
    fetchingTopUsers: boolean;
  };
  error: {
    updateUserProfile: string | null;
    fetchTopUsers: string | null;
  };
  popularUsers: TopUserTypes[] | null;
}

const initialState: UserDataState = {
  loading: {
    updatingUserProfile: false,
    fetchingTopUsers: false,
  },
  error: {
    updateUserProfile: null,
    fetchTopUsers: null,
  },
  popularUsers: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //update current user profile details
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading.updatingUserProfile = true;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading.updatingUserProfile = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error.updateUserProfile =
          (action.payload as string) || "Failed to update user profile";
        state.loading.updatingUserProfile = false;
      });
    //fetch popular/top users
    builder
      .addCase(fetchTopUsers.pending, (state) => {
        state.loading.fetchingTopUsers = true;
      })
      .addCase(fetchTopUsers.fulfilled, (state, action) => {
        state.loading.fetchingTopUsers = false;
        state.popularUsers = action.payload;
      })
      .addCase(fetchTopUsers.rejected, (state, action) => {
        state.loading.fetchingTopUsers = false;
        state.error.fetchTopUsers = action.payload || "unknown error";
      });
  },
});

export const {} = userDataSlice.actions;

export default userDataSlice.reducer;
