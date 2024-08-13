import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/user/authSlice";
import modalReducer from "./slices/modals/modalSlice";
import userDataReducer from "./slices/user/userDataSlice";
import communitiesReducer from "./slices/community/communitySlice";
import postsReducer from "./slices/posts/postsSlice";
import searchReducer from "./slices/search/searchSlice";

const appReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
  modals: modalReducer,
  communities: communitiesReducer,
  posts: postsReducer,
  search: searchReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
