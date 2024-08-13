import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchAll } from "./searchThunks";

// Define the types for the search results
export interface UserSearchResult {
  uid: string;
  name: string;
  email: string;
}

export interface CommunitySearchResult {
  uid: string;
  name: string;
  description: string;
  banner: string;
}

export interface PostSearchResult {
  postId: string;
  userPost: string;
  userName: string;
  communityName: string;
  communityId: string;
}

// Define the type for the initial state
interface SearchState {
  users: UserSearchResult[];
  communities: CommunitySearchResult[];
  posts: PostSearchResult[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initialize the state
const initialState: SearchState = {
  users: [],
  communities: [],
  posts: [],
  status: "idle",
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAll.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        searchAll.fulfilled,
        (
          state,
          action: PayloadAction<{
            users: UserSearchResult[];
            communities: CommunitySearchResult[];
            posts: PostSearchResult[];
          }>
        ) => {
          state.status = "succeeded";
          state.users = action.payload.users;
          state.communities = action.payload.communities;
          state.posts = action.payload.posts;
        }
      )
      .addCase(searchAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error occurred during search";
      });
  },
});

// Export the actions (if you have any)
export const {} = searchSlice.actions;

// Export the reducer
export default searchSlice.reducer;
