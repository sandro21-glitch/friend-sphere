import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

interface ModalState {
  userProfileModal: boolean;
  updateProfileModal: boolean;
}

const initialState: ModalState = {
  userProfileModal: false,
  updateProfileModal: false,
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
  },
});

export const { setUserProfileModal, setUpdateProfileModal } =
  modalSlice.actions;

export default modalSlice.reducer;
