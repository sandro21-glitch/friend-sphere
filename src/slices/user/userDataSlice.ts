import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTopUsers,
  fetchUserById,
  updateUserProfile,
} from "./userDataThunks";
import { TopUserTypes, UserType } from "./userTypes";
// import type { RootState } from "../store";

interface UserDataState {
  loading: {
    updatingUserProfile: boolean;
    fetchingTopUsers: boolean;
    fetchingSingleUser: boolean;
  };
  error: {
    updateUserProfile: string | null;
    fetchTopUsers: string | null;
    fetchSingleUserError: string | null;
  };
  popularUsers: TopUserTypes[] | null;
  singleUser: UserType | null;
}

const initialState: UserDataState = {
  loading: {
    updatingUserProfile: false,
    fetchingTopUsers: false,
    fetchingSingleUser: false,
  },
  error: {
    updateUserProfile: null,
    fetchTopUsers: null,
    fetchSingleUserError: null,
  },
  popularUsers: null,
  singleUser: null,
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
      .addCase(
        fetchTopUsers.fulfilled,
        (state, action: PayloadAction<TopUserTypes[]>) => {
          state.loading.fetchingTopUsers = false;
          state.popularUsers = action.payload;
        }
      )
      .addCase(fetchTopUsers.rejected, (state, action) => {
        state.loading.fetchingTopUsers = false;
        state.error.fetchTopUsers = action.payload || "unknown error";
      });
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading.fetchingSingleUser = true;
    });
    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.loading.fetchingSingleUser = false;
        state.singleUser = action.payload;
      }
    );
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.error.fetchTopUsers = action.payload || "unknown error";
    });
  },
});

export const {} = userDataSlice.actions;

export default userDataSlice.reducer;
