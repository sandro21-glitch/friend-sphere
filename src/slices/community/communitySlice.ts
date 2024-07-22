import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchCommunityById,
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
    userName: string;
    groupName: string;
    postId: string;
    userId: string;
    userPost: string;
    likedBy: string[] | null;
    postComments:
      | {
          userComment: string;
          userId: string;
          userName: string;
        }[]
      | null;
    createdAt: string;
  }[];
}
export interface PostType {
  userName: string;
  groupName: string;
  postId: string;
  userId: string;
  userPost: string;
  likedBy: string[] | null;
  postComments:
    | {
        userComment: string;
        userId: string;
        userName: string;
      }[]
    | null;
  createdAt: string;
}
export interface CommunitySummary {
  uid: string;
  name: string;
}

interface CommunityState {
  userGroups: CommunitySummary[] | null;
  groupById: CommunityTypes | null;
  nonJoinedGroupData: CommunityTypes[] | null;
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
}

const initialState: CommunityState = {
  userGroups: null,
  groupById: null,
  nonJoinedGroupData: null,
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
      .addCase(fetchCommunityById.rejected, () => {});
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
    builder
      .addCase(joinGroup.pending, (state) => {
        state.joinGroup.loading = true;
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.joinGroup.loading = false;
        state.joinGroup.communityId = action.payload.communityUid;

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
      .addCase(leaveGroup.pending, (state) => {
        state.leaveGroup.loading = true;
      })
      .addCase(leaveGroup.fulfilled, (state, action) => {
        state.leaveGroup.loading = false;
        state.leaveGroup.communityId = action.payload.communityUid;
      })
      .addCase(leaveGroup.rejected, (state, action) => {
        state.leaveGroup.loading = false;
        state.leaveGroup.error =
          action?.error.message ?? "Error leaving community";
        state.leaveGroup.communityId = null;
      });
  },
});

export const {} = communitiesSlice.actions;

export default communitiesSlice.reducer;
