import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import { get, ref } from "firebase/database";
import { UserType } from "../user/userTypes";
import { CommunityTypes } from "../community/communityTypes";

// search
export interface SearchResults {
  users: { uid: string; name: string; email: string }[];
  communities: {
    uid: string;
    name: string;
    banner: string;
    description: string;
  }[];
  posts: {
    postId: string;
    userPost: string;
    userName: string;
    communityName: string;
    communityId: string;  // Added communityId to SearchResults
  }[];
}

export const searchAll = createAsyncThunk(
  "search/searchAll",
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const normalizedTerm = searchTerm.toLowerCase(); // Normalize the search term to lowercase

      // Function to fetch matching users
      const fetchUsers = async (): Promise<
        { uid: string; name: string; email: string }[]
      > => {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          const users: UserType[] = Object.values(snapshot.val());
          return users
            .filter(
              (user) =>
                user.name.toLowerCase().startsWith(normalizedTerm)
            )
            .map((user) => ({
              uid: user.uid,
              name: user.name,
              email: user.email,
            }));
        } else {
          return [];
        }
      };

      // Function to fetch matching communities
      const fetchCommunities = async (): Promise<
        { uid: string; name: string; banner: string; description: string }[]
      > => {
        const communitiesRef = ref(database, "communities");
        const snapshot = await get(communitiesRef);
        if (snapshot.exists()) {
          const communities: CommunityTypes[] = Object.values(snapshot.val());
          return communities
            .filter((community) =>
              community.name.toLowerCase().includes(normalizedTerm)
            )
            .map((community) => ({
              uid: community.uid,
              name: community.name,
              banner: community.banner,
              description: community.description,
            }));
        } else {
          return [];
        }
      };

      // Function to fetch all users for lookup
      const fetchAllUsers = async (): Promise<{ [uid: string]: UserType }> => {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return {};
        }
      };

      // Function to fetch and filter posts with user, community, and communityId details
      const fetchPosts = async (): Promise<
        { postId: string; userPost: string; userName: string; communityName: string; communityId: string }[]
      > => {
        const communitiesRef = ref(database, "communities");
        const snapshot = await get(communitiesRef);
        if (snapshot.exists()) {
          const communities: CommunityTypes[] = Object.values(snapshot.val());
          const allUsers = await fetchAllUsers(); // Fetch all users for lookup

          // Collect and filter posts across all communities
          let allPosts: {
            postId: string;
            userPost: string;
            userName: string;
            communityName: string;
            communityId: string;  // Added communityId to the structure
          }[] = [];
          for (const community of communities) {
            if (community.posts) {
              allPosts = [
                ...allPosts,
                ...community.posts
                  .filter((post) =>
                    post.userPost.toLowerCase().includes(normalizedTerm)
                  )
                  .map((post) => ({
                    postId: post.postId,
                    userPost: post.userPost,
                    userName: allUsers[post.userId]?.name || "Unknown",
                    communityName: community.name,
                    communityId: community.uid,  // Added communityId
                  })),
              ];
            }
          }
          return allPosts;
        } else {
          return [];
        }
      };

      // Fetch all results in parallel
      const [users, communities, posts] = await Promise.all([
        fetchUsers(),
        fetchCommunities(),
        fetchPosts(),
      ]);

      const results: SearchResults = { users, communities, posts };

      return results;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error searching data");
    }
  }
);