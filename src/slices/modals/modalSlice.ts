import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

interface joinCommunityTypes {
  isModalOpen: boolean;
  communityData: {
    membersCount: number;
    communityName: string;
    communityId: string;
  } | null;
}
interface ModalState {
  userProfileModal: boolean;
  updateProfileModal: boolean;
  joinCommunity: {
    isModalOpen: boolean;
    communityData: {
      membersCount: number;
      communityName: string;
      communityId: string;
    } | null;
  };
}

const initialState: ModalState = {
  userProfileModal: false,
  updateProfileModal: false,
  joinCommunity: {
    isModalOpen: false,
    communityData: null,
  },
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setUserProfileModal: (state, action: PayloadAction<boolean>) => {
      state.userProfileModal = action.payload;
    },
    setUpdateProfileModal: (state, action: PayloadAction<boolean>) => {
      state.updateProfileModal = action.payload;
    },
    setJoinCommunityModal: (
      state,
      action: PayloadAction<joinCommunityTypes>
    ) => {
      state.joinCommunity.isModalOpen = action.payload.isModalOpen;
      state.joinCommunity.communityData = action.payload.communityData;
    },
  },
});

export const {
  setUserProfileModal,
  setUpdateProfileModal,
  setJoinCommunityModal,
} = modalSlice.actions;

export default modalSlice.reducer;
