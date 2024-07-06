import { useState } from "react";
import CreatePostBtn from "./CreatePostBtn";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { addPostToCommunity } from "../../../../slices/posts/postThunks";
import { nanoid } from "nanoid";

type GroupPostFormTypes = {
  groupId: string;
};

const GroupPostForm = ({ groupId }: GroupPostFormTypes) => {
  const [postText, setPostText] = useState("");
  const dispatch = useAppDispatch();
  const userId = useAppSelector((store) => store.auth.userData?.uid || null);
  const userName = useAppSelector((store) => store.auth.userData?.name || null);
  const groupName = useAppSelector(
    (store) =>
      store.communities.communityData?.find((group) => group.uid === groupId)
        ?.name
  );
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      return;
    }

    const newPost = {
      postId: nanoid(),
      userName,
      groupName,
      userId,
      userPost: postText,
      likedBy: [],
      postComments: null,
    };

    await dispatch(addPostToCommunity({ communityId: groupId, post: newPost }));
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
