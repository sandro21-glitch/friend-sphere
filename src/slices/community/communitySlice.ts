import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCommunities } from "./communityThunks";

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
  loading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  communityData: null,
  loading: false,
  error: null,
};

export const communitiesSlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCommunities.fulfilled,
        (state, action: PayloadAction<CommunityTypes[]>) => {
          state.communityData = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.error = action.error.message ?? "Error fetching communities";
        state.loading = false;
      });
  },
});

export const {} = communitiesSlice.actions;

export default communitiesSlice.reducer;
