import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import { get, onValue, ref, remove, update } from "firebase/database";
import { RootState } from "../../store";
import { SavedPostTypes, UserPostTypes } from "./postsSlice";
import { CommunityTypes } from "../community/communitySlice";

interface AddPostPayload {
  communityId: string;
  post: {
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
          postedAt: string;
        }[]
      | null;
    createdAt: string;
    groupName: string;
  };
}

//add post to the group
export const addPostToCommunity = createAsyncThunk<
  { post: UserPostTypes; communityId: string },
  AddPostPayload,
  { state: RootState }
>("communities/addPostToCommunity", async (payload) => {
  const { communityId, post } = payload;

  const communitiesRef = ref(database, "communities");
  const snapshot = await get(communitiesRef);

  if (!snapshot.exists()) {
    throw new Error("Communities not found");
  }

  let communityKey: string | null = null;

  snapshot.forEach((childSnapshot) => {
    const community = childSnapshot.val();
    if (community.uid === communityId) {
      communityKey = childSnapshot.key;
    }
  });

  if (!communityKey) {
    throw new Error("Community not found");
  }

  const newPost = {
    ...post,
    createdAt: new Date().toISOString(),
    postComments: post.postComments
      ? post.postComments.map((comment) => ({
          ...comment,
          postedAt: comment.postedAt || new Date().toISOString(), // Ensure postedAt is present
        }))
      : null,
  };

  const communityRef = ref(database, `communities/${communityKey}/posts`);
  const communitySnapshot = await get(communityRef);

  const updatedPosts = communitySnapshot.exists()
    ? [...communitySnapshot.val(), newPost]
    : [newPost];

  await update(ref(database, `communities/${communityKey}`), {
    posts: updatedPosts,
  });

  return { post, communityId };
});

interface FetchCommunityPostsPayload {
  communityId: string;
}

interface LikePostPayload {
  communityId: string;
  postId: string;
  userId: string;
}
export const fetchCommunityPosts = createAsyncThunk<
  UserPostTypes[],
  FetchCommunityPostsPayload,
  { rejectValue: string }
>("posts/fetchCommunityPosts", async ({ communityId }, { rejectWithValue }) => {
  try {
    const communitiesRef = ref(database, "communities");

    const snapshot = await new Promise<UserPostTypes[]>((resolve, _) => {
      onValue(
        communitiesRef,
        (snapshot) => {
          const posts: UserPostTypes[] = [];
          snapshot.forEach((childSnapshot) => {
            const community = childSnapshot.val() as CommunityTypes;
            if (community.uid === communityId) {
              const communityPosts = community.posts || [];
              communityPosts.forEach((post: any) => {
                const updatedPost: UserPostTypes = {
                  userId: post.userId,
                  userPost: post.userPost,
                  likedBy: post.likedBy,
                  postComments: post.postComments
                    ? post.postComments.map((comment: any) => ({
                        ...comment,
                        postedAt: comment.postedAt || new Date().toISOString(), // Ensure postedAt is present
                      }))
                    : null,
                  createdAt: post.createdAt,
                  userName: post.userName,
                  postId: post.postId,
                  groupName: post.groupName,
                };
                posts.push(updatedPost);
              });
            }
          });
          resolve(posts);
        },
        {
          onlyOnce: true,
        }
      );
    });

    return snapshot;
  } catch (error: any) {
    return rejectWithValue(error.message || "Error fetching community posts");
  }
});

// like post
export const likePost = createAsyncThunk<
  { postId: string; communityId: string; userId: string },
  LikePostPayload,
  { state: RootState }
>("posts/likePost", async (payload, thunkAPI) => {
  const { communityId, postId, userId } = payload;

  try {
    const communitiesRef = ref(database, "communities");
    const snapshot = await get(communitiesRef);

    if (!snapshot.exists()) {
      throw new Error("Communities not found");
    }

    let communityKey: string | null = null;
    let postKey: string | null = null;

    snapshot.forEach((childSnapshot) => {
      const community = childSnapshot.val();
      if (community.uid === communityId) {
        communityKey = childSnapshot.key;
        const posts = community.posts || [];
        posts.forEach((post: UserPostTypes, index: number) => {
          if (post.postId === postId) {
            postKey = index.toString();
          }
        });
      }
    });

    if (!communityKey || !postKey) {
      throw new Error("Community or post not found");
    }

    const postRef = ref(
      database,
      `communities/${communityKey}/posts/${postKey}/likedBy`
    );
    const postSnapshot = await get(postRef);
    let likedBy = postSnapshot.exists() ? postSnapshot.val() : [];

    if (likedBy.includes(userId)) {
      // Remove user's like
      likedBy = likedBy.filter((id: string) => id !== userId);
    } else {
      // Add user's like
      likedBy.push(userId);
    }

    await update(
      ref(database, `communities/${communityKey}/posts/${postKey}`),
      {
        likedBy,
      }
    );

    return { postId, communityId, userId };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || "Error liking/unliking post"
    );
  }
});

// payload type for the removePost action
interface RemovePostPayload {
  communityId: string;
  postId: string;
  userId: string;
}

//return type for the removePost action
interface RemovePostResponse {
  postId: string;
  communityId: string;
  userId: string;
}
// remove post
export const removePost = createAsyncThunk<
  RemovePostResponse,
  RemovePostPayload,
  { state: RootState }
>("posts/removePost", async (payload, thunkAPI) => {
  const { communityId, postId, userId } = payload;

  try {
    const communitiesRef = ref(database, "communities");
    const snapshot = await get(communitiesRef);

    if (!snapshot.exists()) {
      throw new Error("Communities not found");
    }

    let communityKey: string | null = null;
    let postKey: string | null = null;
    let postOwnerId: string | null = null;

    snapshot.forEach((childSnapshot) => {
      const community = childSnapshot.val();
      if (community.uid === communityId) {
        communityKey = childSnapshot.key;
        const posts = community.posts || [];
        posts.forEach((post: UserPostTypes, index: number) => {
          if (post.postId === postId) {
            postKey = index.toString();
            postOwnerId = post.userId; // Get the owner ID of the post
          }
        });
      }
    });

    if (!communityKey || !postKey) {
      throw new Error("Community or post not found");
    }

    // Check if the user is the owner of the post
    if (postOwnerId !== userId) {
      throw new Error("You are not authorized to delete this post");
    }

    // Remove the post from the database
    await remove(ref(database, `communities/${communityKey}/posts/${postKey}`));

    return { postId, communityId, userId };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Error removing post");
  }
});

// ADD COMMENT TO POST
interface AddCommentPayload {
  communityId: string;
  postId: string;
  postComment: {
    userComment: string;
    userId: string;
    userName: string;
    postedAt?: string;
  };
}

interface AddCommentResponse {
  postId: string;
  communityId: string;
  comment: {
    userComment: string;
    userId: string;
    userName: string;
    postedAt: string;
  };
}
export const addCommentToPost = createAsyncThunk<
  AddCommentResponse,
  AddCommentPayload,
  { state: RootState }
>("posts/addCommentToPost", async (payload, thunkAPI) => {
  const { communityId, postId, postComment } = payload;

  try {
    // Find the specific community
    const communitiesRef = ref(database, "communities");
    const communitiesSnapshot = await get(communitiesRef);

    if (!communitiesSnapshot.exists()) {
      throw new Error("Communities not found");
    }

    let updatedComment: AddCommentResponse | null = null;

    communitiesSnapshot.forEach((communitySnapshot) => {
      const community = communitySnapshot.val();
      if (community.posts) {
        // Find the specific post within the community's posts array
        const updatedPosts = community.posts.map((post: UserPostTypes) => {
          if (post.postId === postId) {
            // Ensure postComments is initialized if it doesn't exist
            if (!post.postComments) {
              post.postComments = [];
            }

            // Create a new comment object
            const newComment = {
              ...postComment,
              postedAt: postComment.postedAt || new Date().toISOString(),
            };

            // Push the new comment to postComments array
            post.postComments.push(newComment);

            // Update the post's comments in Firebase
            update(
              ref(database, `communities/${communitySnapshot.key}/posts`),
              {
                [post.postId]: {
                  ...post,
                  postComments: post.postComments,
                },
              }
            );

            updatedComment = { postId, communityId, comment: newComment };
          }

          return post;
        });

        // Update the community's posts with the updated array
        update(ref(database, `communities/${communitySnapshot.key}`), {
          posts: updatedPosts,
        });
      }
    });

    if (!updatedComment) {
      throw new Error("Post not found");
    }

    return updatedComment;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || "Error adding comment to post"
    );
  }
});

// save post
interface SavePostArgs {
  userId: string;
  postId: string;
  communityId: string;
}

interface SavedPost {
  postId: string;
  communityId: string;
}

export const savePostThunk = createAsyncThunk<
  SavedPost,
  SavePostArgs,
  { rejectValue: string }
>(
  "posts/savePost",
  async ({ userId, postId, communityId }, { rejectWithValue }) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        throw new Error("User not found");
      }

      const userData = snapshot.val();
      const currentSavedPosts: SavedPost[] = userData.savedPosts || [];

      const postToSave: SavedPost = { postId, communityId };
      const updatedSavedPosts = [...currentSavedPosts, postToSave];

      await update(userRef, {
        savedPosts: updatedSavedPosts,
      });

      return postToSave;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// fetch user saved posts
export interface FetchSavedPostsPayload {
  userId: string;
}

export const fetchSavedPostsThunk = createAsyncThunk<
  SavedPostTypes[],
  FetchSavedPostsPayload,
  { state: RootState }
>("posts/fetchSavedPosts", async (payload, thunkAPI) => {
  const { userId } = payload;

  try {
    // Reference to the user's savedPosts array in Firebase
    const userSavedPostsRef = ref(database, `users/${userId}/savedPosts`);
    const snapshot = await get(userSavedPostsRef);

    if (!snapshot.exists()) {
      return []; // Return empty array if no saved posts found
    }

    // Extract the saved posts array from the snapshot
    const savedPostsArray: { communityId: string; postId: string }[] =
      snapshot.val() || [];

    const fetchedPosts: SavedPostTypes[] = [];

    // Reference to the communities in Firebase
    const communitiesRef = ref(database, "communities");
    const communitiesSnapshot = await get(communitiesRef);

    if (!communitiesSnapshot.exists()) {
      throw new Error("Communities not found");
    }

    // Iterate through each saved post and find the matching post in communities
    for (const savedPost of savedPostsArray) {
      const { communityId, postId } = savedPost;

      let post: SavedPostTypes | null = null;

      communitiesSnapshot.forEach((childSnapshot) => {
        const community = childSnapshot.val();
        if (community.uid === communityId) {
          const posts = community.posts || [];
          posts.forEach((pst: SavedPostTypes) => {
            if (pst.postId === postId) {
              post = { ...pst, communityId };
            }
          });
        }
      });

      if (post) {
        fetchedPosts.push(post);
      }
    }

    return fetchedPosts;
  } catch (error: any) {
    console.error("Error fetching saved posts:", error.message);
    return thunkAPI.rejectWithValue(
      error.message || "Error fetching saved posts from communities"
    );
  }
});