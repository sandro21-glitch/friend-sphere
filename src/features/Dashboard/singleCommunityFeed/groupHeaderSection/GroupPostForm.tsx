import { useState } from "react";
import CreatePostBtn from "./CreatePostBtn";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { addPostToCommunity } from "../../../../slices/posts/postThunks";

type GroupPostFormTypes = {
  groupId: string;
};

const GroupPostForm = ({ groupId }: GroupPostFormTypes) => {
  const [postText, setPostText] = useState("");
  const dispatch = useAppDispatch();
  const userId = useAppSelector((store) => store.auth.userData?.uid || null);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      return;
    }

    const newPost = {
      userId,
      userPost: postText,
      likedBy: [],
      postComments: null,
    };

    dispatch(addPostToCommunity({ communityId: groupId, post: newPost }));
    setPostText("");
  };

  return (
    <form onSubmit={handleAddPost} className="flex flex-col p-4 border-b">
      <label htmlFor="post" className="mb-2 font-semibold">
        Share something with your community:
      </label>
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        id="post"
        placeholder="Type your post here..."
        className="p-2 border rounded-md mb-2 resize-none h-[4rem]"
      />
      {postText.length > 0 && postText.trim() !== "" && <CreatePostBtn />}
    </form>
  );
};

export default GroupPostForm;
