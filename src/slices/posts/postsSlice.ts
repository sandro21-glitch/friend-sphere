import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCommentToPost,
  addPostToCommunity,
  fetchCommunityPosts,
  fetchSavedPostsThunk,
  fetchSinglePost,
  likePost,
  removePost,
  savePostThunk,
  unsavePostThunk,
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
  singlePost: UserPostTypes | null;
  loading: {
    fetching: boolean;
    adding: boolean;
    liking: boolean;
    removing: boolean;
    commenting: boolean;
    saving: boolean;
    unsaving: boolean;
    fetchingSavedPosts: boolean;
    fetchingSinglePost: boolean;
  };
  error: {
    fetchingError: string | null;
    addingError: string | null;
    likingError: string | null;
    removingError: string | null;
    commentingError: string | null;
    savingError: string | null;
    unsavingError: string | null;
    fetchingSavedPostsError: string | null;
    fetchingSinglePostError: string | null;
  };
}
[];

const initialState: PostsState = {
  communityPosts: null,
  savedPosts: null,
  singlePost: null,
  loading: {
    fetching: false,
    adding: false,
    liking: false,
    removing: false,
    commenting: false,
    saving: false,
    unsaving: false,
    fetchingSavedPosts: false,
    fetchingSinglePost: false,
  },
  error: {
    fetchingError: null,
    addingError: null,
    likingError: null,
    removingError: null,
    commentingError: null,
    savingError: null,
    unsavingError: null,
    fetchingSavedPostsError: null,
    fetchingSinglePostError: null,
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSavedPostLike: (
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) => {
      const { postId, userId } = action.payload;
      if (state.savedPosts) {
        state.savedPosts = state.savedPosts?.map((post) =>
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
    },
    clearGroupPosts: (state) => {
      state.communityPosts = null;
    },
  },
  extraReducers: (builder) => {
    //add post
    builder
      .addCase(addPostToCommunity.pending, (state) => {
        state.loading.adding = true;
      })
      .addCase(addPostToCommunity.fulfilled, (state, action) => {
        state.loading.adding = false;
        state.communityPosts?.push(action.payload.post);
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

          // Create a set of existing post IDs for deduplication
          const existingPostIds = new Set(
            state.communityPosts?.map((post) => post.postId)
          );

          // Filter out duplicate posts
          const newPosts = action.payload.filter(
            (post) => !existingPostIds.has(post.postId)
          );

          // Append only new posts
          state.communityPosts = state.communityPosts
            ? [...state.communityPosts, ...newPosts]
            : newPosts;
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
        const { comment } = action.payload;

        if (state.singlePost) {
          state.singlePost.postComments = state.singlePost.postComments || [];
          state.singlePost.postComments.push(comment);
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
          : "Failed to save post";
        alert(state.error.removingError || "Failed to save post");
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
          : "Failed to fetch saved posts";
        alert(state.error.removingError || "Failed to fetch saved posts");
      });
    //unsave post
    builder.addCase(unsavePostThunk.pending, (state) => {
      state.loading.unsaving = true;
    });
    builder.addCase(unsavePostThunk.fulfilled, (state) => {
      state.loading.unsaving = false;
    });
    builder.addCase(unsavePostThunk.rejected, (state, action) => {
      state.loading.unsaving = false;
      state.error.unsavingError = action.payload
        ? action.payload.toString()
        : "Failed to unsave post";
      alert(state.error.removingError || "Failed to unsave post");
    });
    //fetching single post data
    builder
      .addCase(fetchSinglePost.pending, (state) => {
        state.loading.fetchingSinglePost = true;
      })
      .addCase(
        fetchSinglePost.fulfilled,
        (state, action: PayloadAction<UserPostTypes>) => {
          state.loading.fetchingSinglePost = false;
          state.singlePost = action.payload;
        }
      )
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.loading.fetchingSinglePost = false;
        state.error.fetchingSinglePostError = action.payload
          ? action.payload.toString()
          : "Failed to fetch post data";
      });
  },
});

export const { setSavedPostLike,clearGroupPosts } = postsSlice.actions;

export default postsSlice.reducer;
