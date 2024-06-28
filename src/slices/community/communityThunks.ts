import { createAsyncThunk } from "@reduxjs/toolkit";

import { get, onValue, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { CommunityTypes } from "./communitySlice";

export const fetchCommunities = createAsyncThunk(
  "community/fetchCommunities",
  async (_, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");

      const snapshot = await new Promise<any>((resolve, _) => {
        onValue(
          communitiesRef,
          (snapshot) => {
            const communities: CommunityTypes[] = [];
            snapshot.forEach((childSnapshot) => {
              communities.push(childSnapshot.val() as CommunityTypes);
            });
            resolve(communities);
          },
          {
            onlyOnce: true,
          }
        );
      });

      return snapshot;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching communities");
    }
  }
);

export const fetchUserCommunities = createAsyncThunk(
  "community/fetchUserCommunities",
  async (userId: string, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");

      const snapshot = await new Promise<any>((resolve, _) => {
        onValue(
          communitiesRef,
          (snapshot) => {
            const communities: CommunityTypes[] = [];
            snapshot.forEach((childSnapshot) => {
              const community = childSnapshot.val() as CommunityTypes;
              if (
                community.members &&
                community.members.some((member) => member.memberid === userId)
              ) {
                communities.push(community);
              }
            });
            resolve(communities);
          },
          {
            onlyOnce: true,
          }
        );
      });

      return snapshot;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Error fetching user communities"
      );
    }
  }
);

export const fetchNonJoinedCommunities = createAsyncThunk(
  "community/fetchNonJoinedCommunities",
  async (userId: string, { rejectWithValue }) => {
    try {
      // Fetch all communities
      const communitiesRef = ref(database, "communities");
      const snapshot = await get(communitiesRef);
      const allCommunities: CommunityTypes[] = [];

      snapshot.forEach((childSnapshot) => {
        allCommunities.push(childSnapshot.val() as CommunityTypes);
      });

      // Filter communities that user has not joined
      const nonJoinedCommunities = allCommunities.filter(
        (community) =>
          !community.members ||
          !community.members.some((member) => member.memberid === userId)
      );

      // Randomly select three communities
      const randomCommunities = nonJoinedCommunities
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      return randomCommunities;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching communities");
    }
  }
);
