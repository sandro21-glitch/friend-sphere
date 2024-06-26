import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/user/authSlice";
import modalReducer from "./slices/modals/modalSlice";
import userDataReducer from "./slices/user/userDataSlice";
import communitiesReducer from "./slices/community/communitySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userData: userDataReducer,
    modals: modalReducer,
    communities: communitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
