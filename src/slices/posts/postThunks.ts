import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import { get, onValue, ref, update } from "firebase/database";
import { RootState } from "../../store";
import { UserPostTypes } from "./postsSlice";
import { CommunityTypes } from "../community/communitySlice";

interface AddPostPayload {
  communityId: string;
  post: {
    userId: string;
    userPost: string;
    likedBy: string[];
    postComments:
      | {
          userComment: string;
          userId: string;
        }[]
      | null;
  };
}

// add community post
export const addPostToCommunity = createAsyncThunk<
  { post: any; communityId: string },
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
              const communityPosts = community.posts || []; // Assuming posts are stored under 'posts' key in each community
              communityPosts.forEach((post:UserPostTypes) => {
                posts.push({
                  userId: post.userId,
                  userPost: post.userPost,
                  likedBy: post.likedBy,
                  postComments: post.postComments,
                  createdAt: post.createdAt,
                });
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