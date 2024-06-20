import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";


interface ModalState {
  userProfileModal: boolean;
}

const initialState: ModalState = {
  userProfileModal: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setUserProfileModal: (state, action: PayloadAction<boolean>) => {
      state.userProfileModal = action.payload;
    },
  },
});

export const { setUserProfileModal } = modalSlice.actions;

export default modalSlice.reducer;
