import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchCommunityById,
  fetchJoinedGroupSummaries,
  fetchNonJoinedCommunities,
  fetchUserCommunities,
  joinGroup,
  leaveGroup,
} from "./communityThunks";
import {
  CommunitySummary,
  CommunityTypes,
  FullGroupListSummary,
} from "./communityTypes";

interface CommunityState {
  userGroups: CommunitySummary[] | null;
  groupById: CommunityTypes | null;
  nonJoinedGroupData: CommunityTypes[] | null;
  fullGroupList: FullGroupListSummary[] | null;
  joinedGroups: {
    loading: boolean;
    error: string | null;
  };
  singleGroup: {
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
  leaveGroup: {
    loading: boolean;
    error: string | null;
    communityId: string | null;
  };
  fullGroups: {
    loading: boolean;
    error: string | null;
  };
}

const initialState: CommunityState = {
  userGroups: null,
  groupById: null,
  nonJoinedGroupData: null,
  fullGroupList: null,
  joinedGroups: {
    loading: false,
    error: null,
  },
  singleGroup: {
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
  leaveGroup: {
    loading: false,
    error: null,
    communityId: null,
  },
  fullGroups: {
    loading: false,
    error: null,
  },
};

export const communitiesSlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch user communities
    builder
      .addCase(fetchUserCommunities.pending, (state) => {
        state.joinedGroups.loading = true;
        state.joinedGroups.error = null;
      })
      .addCase(
        fetchUserCommunities.fulfilled,
        (state, action: PayloadAction<CommunitySummary[]>) => {
          state.userGroups = action.payload;
          state.joinedGroups.loading = false;
          state.joinedGroups.error = null;
        }
      )
      .addCase(fetchUserCommunities.rejected, (state, action) => {
        state.joinedGroups.error =
          action.error.message ?? "Error user fetching communities";
        state.joinedGroups.loading = false;
      });
    //fetch single community with id
    builder
      .addCase(fetchCommunityById.pending, (state) => {
        state.singleGroup.loading = true;
      })
      .addCase(
        fetchCommunityById.fulfilled,
        (state, action: PayloadAction<CommunityTypes>) => {
          state.singleGroup.loading = false;
          state.groupById = action.payload;
        }
      )
      .addCase(fetchCommunityById.rejected, (state, action) => {
        state.singleGroup.error =
          action.error.message ?? "Error fetching group data";
      });
    //fetch non joined groups
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
    //join group
    builder
      .addCase(joinGroup.pending, (state) => {
        state.joinGroup.loading = true;
      })
      .addCase(
        joinGroup.fulfilled,
        (
          state,
          action: PayloadAction<{
            communityToUpdate: CommunityTypes;
            communityUid: string;
          }>
        ) => {
          state.joinGroup.loading = false;
          const { communityToUpdate, communityUid } = action.payload;
          state.joinGroup.communityId = communityUid;

          if (state.userGroups && communityToUpdate) {
            // console.log(communityToUpdate);
            state.userGroups = [
              ...state.userGroups,
              {
                name: communityToUpdate.name,
                uid: communityUid,
              },
            ];
          }

          // Filter out the joined group from nonJoinedGroupData
          if (state.nonJoinedGroupData) {
            state.nonJoinedGroupData = state.nonJoinedGroupData.filter(
              (group) => group.uid !== action.payload.communityUid
            );
          }
        }
      )
      .addCase(joinGroup.rejected, (state, action) => {
        state.joinGroup.loading = false;
        state.joinGroup.communityId = null;
        state.joinGroup.error =
          action?.error.message ?? "Error fetching communities";
      });
    builder
      .addCase(leaveGroup.pending, (state) => {
        state.leaveGroup.loading = true;
      })
      .addCase(
        leaveGroup.fulfilled,
        (
          state,
          action: PayloadAction<{
            communityToUpdate: CommunityTypes;
            communityUid: string;
          }>
        ) => {
          state.leaveGroup.loading = false;
          const { communityUid } = action.payload;
          state.leaveGroup.communityId = communityUid;
          if (state.userGroups) {
            state.userGroups = state.userGroups?.filter(
              (group) => group.uid !== communityUid
            );
          }
        }
      )
      .addCase(leaveGroup.rejected, (state, action) => {
        state.leaveGroup.loading = false;
        state.leaveGroup.error =
          action?.error.message ?? "Error leaving community";
        state.leaveGroup.communityId = null;
      });
    builder
      .addCase(fetchJoinedGroupSummaries.pending, (state) => {
        state.fullGroups.loading = true;
      })
      .addCase(
        fetchJoinedGroupSummaries.fulfilled,
        (state, action: PayloadAction<FullGroupListSummary[]>) => {
          state.fullGroups.loading = false;
          state.fullGroupList = action.payload;
        }
      )
      .addCase(fetchJoinedGroupSummaries.rejected, (state, action) => {
        state.fullGroups.error =
          action?.error.message ?? "Error leaving community";
      });
  },
});

export const {} = communitiesSlice.actions;

export default communitiesSlice.reducer;
