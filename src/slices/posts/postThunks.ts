import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import { get, onValue, ref, remove, update } from "firebase/database";
import { RootState } from "../../store";
import { UserPostTypes } from "./postsSlice";
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

interface AddCommentResponse {}
interface AddCommentPayload {
  postId: string;
  comment: string;
  communityId: string;
}

//add comment to post
export const addCommentToPost = createAsyncThunk<
  AddCommentResponse,
  AddCommentPayload,
  { state: RootState }
>("posts/addCommentToPost", async (payload, thunkAPI) => {
  const { communityId, postId, comment } = payload;

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
      `communities/${communityKey}/posts/${postKey}/postComments`
    );
    const postSnapshot = await get(postRef);
    const postComments = postSnapshot.exists() ? postSnapshot.val() : [];

    const newComment = {
      ...comment,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...postComments, newComment];

    await update(
      ref(database, `communities/${communityKey}/posts/${postKey}`),
      {
        postComments: updatedComments,
      }
    );

    return { postId, communityId, comment: newComment };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || "Error adding comment to post"
    );
  }
});
