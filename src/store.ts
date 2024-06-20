import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/user/authSlice";
import modalSlice from "./slices/modals/modalSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
