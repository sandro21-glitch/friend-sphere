import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/user/authSlice";
import modalReducer from "./slices/modals/modalSlice";
import userDataReducer from "./slices/modals/modalSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    userData: userDataReducer,
    modals: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
