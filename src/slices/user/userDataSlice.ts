import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRelevantPosts,
  fetchTopUsers,
  fetchUserById,
  followUser,
  unfollowUser,
  updateUserProfile,
} from "./userDataThunks";
import { TopUserTypes, UserType } from "./userTypes";
import { UserPostTypes } from "../posts/postsSlice";
// import type { RootState } from "../store";

interface UserDataState {
  loading: {
    updatingUserProfile: boolean;
    fetchingTopUsers: boolean;
    fetchingSingleUser: boolean;
    following: boolean;
    unFollowing: boolean;
    loadingRelevantPosts: boolean;
  };
  error: {
    updateUserProfile: string | null;
    fetchTopUsers: string | null;
    fetchSingleUserError: string | null;
    followingError: string | null;
    unFollowingError: string | null;
    relevantPostsError: string | null;
  };
  popularUsers: TopUserTypes[] | null;
  singleUser: UserType | null;
  relevantPosts: UserPostTypes[] | null;
}

const initialState: UserDataState = {
  loading: {
    updatingUserProfile: false,
    fetchingTopUsers: false,
    fetchingSingleUser: false,
    following: false,
    unFollowing: false,
    loadingRelevantPosts: false,
  },
  error: {
    updateUserProfile: null,
    fetchTopUsers: null,
    fetchSingleUserError: null,
    followingError: null,
    unFollowingError: null,
    relevantPostsError: null,
  },
  popularUsers: null,
  singleUser: null,
  relevantPosts: null,
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
    //fetch user page by user id
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading.fetchingSingleUser = true;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loading.fetchingSingleUser = false;
          state.singleUser = action.payload;
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error.fetchTopUsers = action.payload || "unknown error";
      });
    //follow user
    builder
      .addCase(followUser.pending, (state) => {
        state.loading.following = true;
      })
      .addCase(followUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.following = false;
        if (state.popularUsers) {
          state.popularUsers = state.popularUsers?.filter(
            (user) => user.id !== action.payload
          );
        }
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading.following = false;
        const followingError = action.payload as string;
        state.error.followingError = followingError || "Failed to follow user";
      });
    //unfollow user
    builder
      .addCase(unfollowUser.pending, (state) => {
        state.loading.unFollowing = true;
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.loading.unFollowing = false;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading.unFollowing = false;
        const unfollowError = action.payload as string;
        state.error.unFollowingError =
          unfollowError || "Failed to unfollow user";
      });
    //fetch relevant posts
    builder
      .addCase(fetchRelevantPosts.pending, (state) => {
        state.loading.loadingRelevantPosts = true;
      })
      .addCase(
        fetchRelevantPosts.fulfilled,
        (state, action: PayloadAction<UserPostTypes[]>) => {
          state.loading.loadingRelevantPosts = false;
          state.relevantPosts = action.payload;
        }
      )
      .addCase(fetchRelevantPosts.rejected, (state, action) => {
        state.loading.loadingRelevantPosts = false;
        const err = action.payload as string;
        state.error.relevantPostsError = err || "Error fetching relevant posts";
      });
  },
});

export const {} = userDataSlice.actions;

export default userDataSlice.reducer;
