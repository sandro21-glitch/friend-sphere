import { createSlice } from "@reduxjs/toolkit";

interface UserPostTypes {
  userid: string;
  userPost: string;
  likedBy: string[];
  postComments:
    | {
        userComment: string;
        userid: string;
      }[]
    | null;
}

interface PostsState {
  communityPost: {
    userPost: UserPostTypes;
    communityId: string;
  } | null;
}

const initialState: PostsState = {
  communityPost: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
