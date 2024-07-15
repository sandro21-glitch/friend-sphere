import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCommentToPost,
  addPostToCommunity,
  fetchCommunityPosts,
  fetchSavedPostsThunk,
  likePost,
  removePost,
  savePostThunk,
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
        userName: string;
        postedAt?: string;
      }[]
    | null;
  createdAt: string;
  groupName: string;
}
export interface SavedPostTypes extends UserPostTypes {
  communityId: string;
}

interface PostsState {
  communityPosts: UserPostTypes[] | null;
  savedPosts: SavedPostTypes[] | null;
  loading: {
    fetching: boolean;
    adding: boolean;
    liking: boolean;
    removing: boolean;
    commenting: boolean;
    saving: boolean;
    fetchingSavedPosts: boolean;
  };
  error: {
    fetchingError: string | null;
    addingError: string | null;
    likingError: string | null;
    removingError: string | null;
    commentingError: string | null;
    savingError: string | null;
    fetchingSavedPostsError: string | null;
  };
}
[];

const initialState: PostsState = {
  communityPosts: null,
  savedPosts: null,
  loading: {
    fetching: false,
    adding: false,
    liking: false,
    removing: false,
    commenting: false,
    saving: false,
    fetchingSavedPosts: false,
  },
  error: {
    fetchingError: null,
    addingError: null,
    likingError: null,
    removingError: null,
    commentingError: null,
    savingError: null,
    fetchingSavedPostsError: null,
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add post
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
    //fetch all single group posts
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
    //like posts
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
        alert(state.error.likingError || "Unknown error");
      });
    //remove post
    builder
      .addCase(removePost.pending, (state) => {
        state.loading.removing = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        // set the loading state for removing to false
        state.loading.removing = false;
        const { postId } = action.payload;
        // remove the post from communityPosts if it exists
        if (state.communityPosts) {
          state.communityPosts = state.communityPosts.filter(
            (post) => post.postId !== postId
          );
        }
        // remove the post from savedPosts if it exists
        if (state.savedPosts) {
          state.savedPosts = state.savedPosts.filter(
            (post) => post.postId !== postId
          );
        }
      })
      .addCase(removePost.rejected, (state, action) => {
        state.loading.removing = false;
        state.error.removingError = action.payload
          ? action.payload.toString()
          : "Unknown error";
        alert(state.error.removingError || "Unknown error");
      });
    //comment to post
    builder
      .addCase(addCommentToPost.pending, (state) => {
        state.loading.commenting = true;
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        state.loading.commenting = false;
        const { comment, postId } = action.payload;

        //for community posts
        if (state.communityPosts) {
          state.communityPosts = state.communityPosts.map(
            (post: UserPostTypes) => {
              if (post.postId === postId) {
                return {
                  ...post,
                  postComments: [...(post.postComments || []), comment],
                };
              }
              return post;
            }
          );
        }
        //for saved posts
        if (state.savedPosts) {
          state.savedPosts = state.savedPosts.map((post: SavedPostTypes) => {
            if (post.postId === postId) {
              return {
                ...post,
                postComments: [...(post.postComments || []), comment],
              };
            }
            return post;
          });
        }
      })
      .addCase(addCommentToPost.rejected, (state, action) => {
        state.error.removingError = action.payload
          ? action.payload.toString()
          : "Unknown error";
        alert(state.error.removingError || "Unknown error");
      });
    //save posts
    builder
      .addCase(savePostThunk.pending, (state) => {
        state.loading.saving = true;
      })
      .addCase(savePostThunk.fulfilled, (state) => {
        state.loading.saving = false;
      })
      .addCase(savePostThunk.rejected, (state, action) => {
        state.loading.saving = false;
        state.error.removingError = action.payload
          ? action.payload.toString()
          : "Unknown error";
        alert(state.error.removingError || "Unknown error");
      });
    //fetch saved posts
    builder
      .addCase(fetchSavedPostsThunk.pending, (state) => {
        state.loading.fetchingSavedPosts = true;
      })
      .addCase(
        fetchSavedPostsThunk.fulfilled,
        (state, action: PayloadAction<SavedPostTypes[]>) => {
          state.loading.fetchingSavedPosts = false;
          state.savedPosts = action.payload;
        }
      )
      .addCase(fetchSavedPostsThunk.rejected, (state, action) => {
        state.loading.fetchingSavedPosts = false;
        state.error.fetchingSavedPostsError = action.payload
          ? action.payload.toString()
          : "Unknown error";
        alert(state.error.removingError || "Unknown error");
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
