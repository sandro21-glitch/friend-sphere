import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchNonJoinedCommunities,
  fetchUserCommunities,
} from "./communityThunks";

export interface CommunityTypes {
  name: string;
  uid: string;
  description: string;
  banner: string;
  rules: {
    rule: string;
    description: string;
    id: string;
  }[];
  members:
    | {
        memberid: string;
      }[]
    | null;
  posts: {
    userid: string;
    userPost: string;
    postLikes: number;
    postComments:
      | {
          userComment: string;
          userid: string;
        }[]
      | null;
  };
}

interface CommunityState {
  communityData: CommunityTypes[] | null;
  nonJoinedGroupData: CommunityTypes[] | null;
  joinedGroups: {
    loading: boolean;
    error: string | null;
  };
  nonJoinedGroups: {
    loading: boolean;
    error: string | null;
  };
}

const initialState: CommunityState = {
  communityData: null,
  nonJoinedGroupData: null,
  joinedGroups: {
    loading: false,
    error: null,
  },
  nonJoinedGroups: {
    loading: false,
    error: null,
  },
};

export const communitiesSlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCommunities.pending, (state) => {
        state.joinedGroups.loading = true;
        state.joinedGroups.error = null;
      })
      .addCase(
        fetchUserCommunities.fulfilled,
        (state, action: PayloadAction<CommunityTypes[]>) => {
          state.communityData = action.payload;
          state.joinedGroups.loading = false;
          state.joinedGroups.error = null;
        }
      )
      .addCase(fetchUserCommunities.rejected, (state, action) => {
        state.joinedGroups.error =
          action.error.message ?? "Error fetching communities";
        state.joinedGroups.loading = false;
      });
    builder
      .addCase(fetchNonJoinedCommunities.pending, (state) => {
        state.nonJoinedGroups.loading = true;
      })
      .addCase(fetchNonJoinedCommunities.fulfilled, (state, action) => {
        state.nonJoinedGroups.loading = false;
        state.nonJoinedGroupData = action.payload;
      })
      .addCase(fetchNonJoinedCommunities.rejected, (state, action) => {
        state.nonJoinedGroups.error =
          action?.error.message ?? "Error fetching communities";
        state.nonJoinedGroups.loading = false;
      });
  },
});

export const {} = communitiesSlice.actions;

export default communitiesSlice.reducer;
