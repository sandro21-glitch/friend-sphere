import { useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect, useState } from "react";

import SavePostBtn from "./commentActions/SavePostBtn";
import PostInteractions from "./commentActions/PostInteractions";
import UnsavePostBtn from "./commentActions/UnsavePostBtn";

type PostCommentActionTypes = {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;
};

const PostCommentActions = ({
  likedBy,
  postCommentLength,
  postId,
  communityId,
}: PostCommentActionTypes) => {
  const savedPosts = useAppSelector((store) => store.posts.savedPosts);
  const [isPostSaved, setIsPostSaved] = useState<boolean>(false);

  useEffect(() => {
    const postSaved =
      savedPosts?.some(
        (post) => post.postId === postId && post.communityId === communityId
      ) || false;
    setIsPostSaved(postSaved);
  }, [savedPosts, postId, communityId]);

  return (
    <div className="flex items-center justify-between mb-5">
      <PostInteractions
        likedBy={likedBy}
        postId={postId}
        communityId={communityId}
        postCommentLength={postCommentLength}
      />
      {isPostSaved ? (
        <UnsavePostBtn />
      ) : (
        <SavePostBtn
          isPostSaved={isPostSaved}
          postId={postId}
          communityId={communityId}
          setIsPostSaved={setIsPostSaved}
        />
      )}
    </div>
  );
};

export default PostCommentActions;
