import { createAsyncThunk } from "@reduxjs/toolkit";

import { onValue, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { CommunityTypes } from "./communitySlice";


export const fetchCommunities = createAsyncThunk(
  "community/fetchCommunities",
  async (_, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");

      const snapshot = await new Promise<any>((resolve, _) => {
        onValue(communitiesRef, (snapshot) => {
          const communities: CommunityTypes[] = [];
          snapshot.forEach((childSnapshot) => {
            communities.push(childSnapshot.val() as CommunityTypes);
          });
          resolve(communities);
        }, {
          onlyOnce: true,
        });
      });

      return snapshot;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching communities");
    }
  }
);
