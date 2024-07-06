import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPostToCommunity, fetchCommunityPosts } from "./postThunks";

export interface UserPostTypes {
  userName: string;
  postId: string;
  userId: string;
  userPost: string;
  likedBy: string[] | null;
  postComments:
    | {
        userComment: string;
        userId: string;
      }[]
    | null;
  createdAt: number;
  groupName: string;
}

interface PostsState {
  communityPosts: UserPostTypes[] | null;
  loading: {
    fetching: boolean;
    adding: boolean;
  };
  error: {
    fetchingError: string | null;
    addingError: string | null;
  };
}
[];

const initialState: PostsState = {
  communityPosts: null,
  loading: {
    fetching: false,
    adding: false,
  },
  error: {
    fetchingError: null,
    addingError: null,
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPostToCommunity.pending, (state) => {
        state.loading.adding = true;
      })
      .addCase(addPostToCommunity.fulfilled, (state, action) => {
        state.loading.adding = false;
        // You may want to update the local state here if necessary
        console.log(action.payload);
      })
      .addCase(addPostToCommunity.rejected, (state, action) => {
        state.loading.adding = false;
        state.error.addingError = action.error.message || "Failed to add post";
      });
    builder
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.loading.fetching = true;
      })
      .addCase(
        fetchCommunityPosts.fulfilled,
        (state, action: PayloadAction<UserPostTypes[]>) => {
          state.loading.fetching = false;
          state.communityPosts = action.payload || null;
        }
      )
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.loading.fetching = false;
        state.error.fetchingError = action.payload || "fetching posts rejected";
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
