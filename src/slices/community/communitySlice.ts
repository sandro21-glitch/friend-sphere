import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchNonJoinedCommunities,
  fetchUserCommunities,
  joinGroup,
  leaveGroup,
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
  joinGroup: {
    loading: boolean;
    error: string | null;
    communityId: string | null;
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
  joinGroup: {
    loading: false,
    error: null,
    communityId: null,
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
    builder
      .addCase(joinGroup.pending, (state) => {
        state.joinGroup.loading = true;
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.joinGroup.loading = false;
        state.joinGroup.communityId = action.payload.communityUid;
        // add the joined group to communityData if it's not already there
        if (state.communityData) {
          state.communityData.push(action.payload.communityToUpdate);
        }
        // filter out the joined group from nonJoinedGroupData
        if (state.nonJoinedGroupData) {
          state.nonJoinedGroupData = state.nonJoinedGroupData.filter(
            (group) => group.uid !== action.payload.communityUid
          );
        }
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.joinGroup.loading = false;
        state.joinGroup.communityId = null;
        state.joinGroup.error =
          action?.error.message ?? "Error fetching communities";
      });
    builder
      .addCase(leaveGroup.pending, () => {
        console.log("loading");
      })
      .addCase(leaveGroup.fulfilled, () => {
        console.log("fulfilled");
      })
      .addCase(leaveGroup.rejected, () => {
        console.log("rejected");
      });
  },
});

export const {} = communitiesSlice.actions;

export default communitiesSlice.reducer;
