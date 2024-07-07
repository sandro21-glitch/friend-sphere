import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addPostToCommunity,
  fetchCommunityPosts,
  likePost,
} from "./postThunks";

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
  createdAt: string;
  groupName: string;
}

interface PostsState {
  communityPosts: UserPostTypes[] | null;
  loading: {
    fetching: boolean;
    adding: boolean;
    liking: boolean;
  };
  error: {
    fetchingError: string | null;
    addingError: string | null;
    likingError: string | null;
  };
}
[];

const initialState: PostsState = {
  communityPosts: null,
  loading: {
    fetching: false,
    adding: false,
    liking: false,
  },
  error: {
    fetchingError: null,
    addingError: null,
    likingError: null,
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
        if (state.communityPosts) {
          const newPost = {
            ...action.payload.post,
            createdAt: new Date().toISOString(),
          };
          state.communityPosts.push(newPost);
        }
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
    builder
      .addCase(likePost.pending, (state) => {
        state.loading.liking = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading.liking = false;
        const { postId, userId } = action.payload;
        if (state.communityPosts) {
          state.communityPosts = state.communityPosts?.map((post) =>
            post.postId === postId
              ? {
                  ...post,
                  likedBy: post.likedBy
                    ? post.likedBy.includes(userId)
                      ? post.likedBy.filter((id) => id !== userId) // remove userId if already liked
                      : [...post.likedBy, userId] // add userId if not liked
                    : [userId],
                }
              : post
          );
        }
      })

      .addCase(likePost.rejected, (state, action) => {
        state.loading.liking = false;
        state.error.likingError = action.payload
          ? action.payload.toString()
          : "Unknown error";
        alert(state.error.likingError);
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
