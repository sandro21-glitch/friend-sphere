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
interface LeaveCommunityTypes {
  isModalOpen: boolean;
  dataIds: {
    communityId: string;
    userId: string;
  } | null;
}
interface DeletePostModal {
  isModalOpen: boolean;
  dataIds: {
    communityId: string;
    postId: string;
    userId: string;
  } | null;
}
interface ModalState {
  userProfileModal: boolean;
  updateProfileModal: boolean;
  joinCommunity: joinCommunityTypes;
  leaveCommunity: LeaveCommunityTypes;
  deletePostModal: DeletePostModal;
}

const initialState: ModalState = {
  userProfileModal: false,
  updateProfileModal: false,
  joinCommunity: {
    isModalOpen: false,
    communityData: null,
  },
  leaveCommunity: {
    isModalOpen: false,
    dataIds: null,
  },
  deletePostModal: {
    isModalOpen: false,
    dataIds: null,
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
    setLeaveCommunity: (state, action: PayloadAction<LeaveCommunityTypes>) => {
      state.leaveCommunity.isModalOpen = action.payload.isModalOpen;
      state.leaveCommunity.dataIds = action.payload.dataIds;
    },
    setDeletePostModal: (state, action: PayloadAction<DeletePostModal>) => {
      state.deletePostModal.isModalOpen = action.payload.isModalOpen;
      state.deletePostModal.dataIds = action.payload.dataIds;
    },
  },
});

export const {
  setUserProfileModal,
  setUpdateProfileModal,
  setJoinCommunityModal,
  setLeaveCommunity,
  setDeletePostModal
} = modalSlice.actions;

export default modalSlice.reducer;
