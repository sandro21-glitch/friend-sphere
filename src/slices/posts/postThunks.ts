import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import { get, onValue, ref, remove, set, update } from "firebase/database";
import { RootState } from "../../store";
import { SavedPostTypes, UserPostTypes } from "./postsSlice";
import { UserData } from "../user/userTypes";
import { CommunityTypes } from "../community/communityTypes";

//add post to communit
export const addPostToCommunity = createAsyncThunk<
  { post: UserPostTypes; communityId: string },
  { communityId: string; post: UserPostTypes }
>("communities/addPostToCommunity", async (payload, { rejectWithValue }) => {
  const { communityId, post } = payload;

  try {
    const communitiesRef = ref(database, "communities");
    const snapshot = await get(communitiesRef);

    if (!snapshot.exists()) {
      return rejectWithValue("Communities not found");
    }

    let communityKey: string | null = null;

    snapshot.forEach((childSnapshot) => {
      const community = childSnapshot.val() as CommunityTypes;
      if (community.uid === communityId) {
        // Ensure 'uid' and 'communityId' match
        communityKey = childSnapshot.key;
      }
    });

    if (!communityKey) {
      return rejectWithValue("Community not found");
    }

    const communityPostsRef = ref(
      database,
      `communities/${communityKey}/posts`
    );

    // Fetch existing posts to find the highest index
    const postsSnapshot = await get(communityPostsRef);
    let newIndex = 0;

    if (postsSnapshot.exists()) {
      const posts = postsSnapshot.val() as Record<string, any>;
      // Find the highest index
      newIndex =
        Math.max(...Object.keys(posts).map((key) => parseInt(key))) + 1;
    }

    // Set the new post at the determined index
    await set(ref(database, `communities/${communityKey}/posts/${newIndex}`), {
      ...post,
      createdAt: new Date().toISOString(),
      postComments: post.postComments
        ? post.postComments.map((comment) => ({
            ...comment,
            postedAt: comment.postedAt || new Date().toISOString(),
          }))
        : [], // Ensure postComments is an empty array if null
    });

    return { post, communityId };
  } catch (error: any) {
    return rejectWithValue(error.message || "Error adding post to community");
  }
});
interface LikePostPayload {
  communityId: string;
  postId: string;
  userId: string;
}
export interface FetchCommunityPostsPayload {
  communityId: string;
  offset?: string; // Key of the last post fetched
  limit?: number; // Number of posts to fetch
}
export interface FetchCommunityPostsResult {
  communityId: string;
  posts: UserPostTypes[];
}
export const fetchCommunityPosts = createAsyncThunk<
  FetchCommunityPostsResult, // Updated return type
  FetchCommunityPostsPayload,
  { rejectValue: string }
>(
  "posts/fetchCommunityPosts",
  async ({ communityId, offset = "", limit = 10 }, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");
      const snapshot = await get(communitiesRef);

      if (!snapshot.exists()) {
        return rejectWithValue("Communities not found");
      }

      let communityKey: string | null = null;
      const posts: UserPostTypes[] = [];

      snapshot.forEach((childSnapshot) => {
        const community = childSnapshot.val();
        if (community.uid === communityId) {
          communityKey = childSnapshot.key;
        }
      });

      if (!communityKey) {
        return rejectWithValue("Community not found");
      }

      const communityPostsRef = ref(
        database,
        `communities/${communityKey}/posts`
      );
      const communityPostsSnapshot = await get(communityPostsRef);

      if (!communityPostsSnapshot.exists()) {
        return { communityId, posts }; // No posts found, but return community ID
      }

      // Get all posts from snapshot
      const allPosts: UserPostTypes[] = [];
      communityPostsSnapshot.forEach((postSnapshot) => {
        const post = postSnapshot.val();
        allPosts.push({
          userId: post.userId,
          userPost: post.userPost,
          likedBy: post.likedBy,
          postComments: post.postComments
            ? post.postComments.map((comment: any) => ({
                ...comment,
                postedAt: comment.postedAt || new Date().toISOString(),
              }))
            : null,
          createdAt: post.createdAt,
          userName: post.userName,
          postId: post.postId,
          groupName: post.groupName,
        });
      });

      // Sort posts by createdAt in descending order
      const sortedPosts = allPosts.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      // Apply offset and limit
      const startIndex = offset
        ? sortedPosts.findIndex((post) => post.postId === offset) + 1
        : 0;
      const limitedPosts = sortedPosts.slice(startIndex, startIndex + limit);

      return { communityId, posts: limitedPosts }; // Return community ID and posts
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching community posts");
    }
  }
);
// likePost thunk
export const likePost = createAsyncThunk<
  { postId: string; communityId: string; userId: string; likedBy: string[] },
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
    let updatedLikedBy: string[] = [];

    snapshot.forEach((childSnapshot) => {
      const community = childSnapshot.val();
      if (community.uid === communityId) {
        communityKey = childSnapshot.key;
        const posts = community.posts || [];
        posts.forEach((post: UserPostTypes, index: number) => {
          if (post.postId === postId) {
            postKey = index.toString();
            updatedLikedBy = post.likedBy || [];
          }
        });
      }
    });

    if (!communityKey || !postKey) {
      throw new Error("Community or post not found");
    }

    if (updatedLikedBy.includes(userId)) {
      updatedLikedBy = updatedLikedBy.filter((id: string) => id !== userId);
    } else {
      updatedLikedBy.push(userId);
    }

    await update(
      ref(database, `communities/${communityKey}/posts/${postKey}`),
      {
        likedBy: updatedLikedBy,
      }
    );

    return { postId, communityId, userId, likedBy: updatedLikedBy };
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
    const userSavedPostsRef = ref(database, `users/${userId}`);
    const userSnapshot = await get(userSavedPostsRef);

    if (!userSnapshot.exists()) {
      throw new Error("User not found");
    }

    const userData: UserData = userSnapshot.val();
    const savedPostsArray: { communityId: string; postId: string }[] =
      userData.savedPosts || [];
    const joinedGroups: Set<string> = new Set(
      userData.joinedGroups.map((group) => group.groupId)
    );

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

      // Check if the communityId is in the user's joined groups
      if (!joinedGroups.has(communityId)) {
        continue; // Skip this community if not joined
      }

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

// unsave post
interface UnsavePostArgs {
  userId: string;
  postId: string;
  communityId: string;
}

export const unsavePostThunk = createAsyncThunk<
  SavedPost,
  UnsavePostArgs,
  { rejectValue: string }
>(
  "posts/unsavePost",
  async ({ userId, postId, communityId }, { rejectWithValue }) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        throw new Error("User not found");
      }

      const userData = snapshot.val();
      const currentSavedPosts: SavedPost[] = userData.savedPosts || [];

      // Filter out the post to unsave
      const updatedSavedPosts = currentSavedPosts.filter(
        (savedPost) =>
          !(
            savedPost.postId === postId && savedPost.communityId === communityId
          )
      );

      await update(userRef, {
        savedPosts: updatedSavedPosts,
      });

      return { postId, communityId };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch a single post
export const fetchSinglePost = createAsyncThunk<
  UserPostTypes,
  { communityId: string; postId: string },
  { rejectValue: string }
>(
  "community/fetchSinglePost",
  async ({ communityId, postId }, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");

      const snapshot = await new Promise<UserPostTypes | null>((resolve, _) => {
        onValue(
          communitiesRef,
          (snapshot) => {
            let post: UserPostTypes | null = null;
            snapshot.forEach((childSnapshot) => {
              const community = childSnapshot.val() as CommunityTypes;
              if (community.uid === communityId) {
                const communityPosts = community.posts || [];
                communityPosts.forEach((p: any) => {
                  if (p.postId === postId) {
                    post = {
                      userId: p.userId,
                      userPost: p.userPost,
                      likedBy: p.likedBy,
                      postComments: p.postComments
                        ? p.postComments.map((comment: any) => ({
                            ...comment,
                            postedAt:
                              comment.postedAt || new Date().toISOString(), // Ensure postedAt is present
                          }))
                        : null,
                      createdAt: p.createdAt,
                      userName: p.userName,
                      postId: p.postId,
                      groupName: p.groupName,
                    };
                  }
                });
              }
            });
            resolve(post);
          },
          {
            onlyOnce: true,
          }
        );
      });

      if (snapshot) {
        return snapshot;
      } else {
        return rejectWithValue("Post not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching single post");
    }
  }
);
