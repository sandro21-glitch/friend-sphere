import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { likePost } from "../../../../slices/posts/postThunks";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface PostActionTypes {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;
  timeAgo: string;
  userName: string;
  groupName: string;
  userPost: string;
}

const PostActions = ({
  likedBy,
  postCommentLength,
  postId,
  communityId,
  timeAgo,
  userName,
  groupName,
  userPost,
}: PostActionTypes) => {
  const {
    loading: { liking },
  } = useAppSelector((store) => store.posts);
  const userId = useAppSelector((store) => store.auth.userData?.uid);
  const dispatch = useAppDispatch();

  const [localLiked, setLocalLiked] = useState(
    likedBy.some((likedId) => likedId === userId)
  );
  const [localLikedCount, setLocalLikedCount] = useState(likedBy.length);

  const handleLikePost = async () => {
    if (!userId) return;

    setLocalLiked(!localLiked);
    setLocalLikedCount(localLiked ? localLikedCount - 1 : localLikedCount + 1);

    try {
      await dispatch(likePost({ postId, userId, communityId })).unwrap();
    } catch (error) {
      setLocalLiked(!localLiked);
      setLocalLikedCount(
        localLiked ? localLikedCount + 1 : localLikedCount - 1
      );
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={handleLikePost}
        className="flex items-center gap-1"
        disabled={liking}
      >
        {localLiked ? (
          <BiSolidLike className=" text-[1.5rem]" />
        ) : (
          <BiLike className=" text-[1.5rem]" />
        )}
        <span className="text-[16px] font-semibold">{localLikedCount}</span>
      </button>
      <Link
        to={`/post/${postId}`}
        state={{
          postInfo: {
            likedBy,
            postCommentLength,
            postId,
            communityId,
            timeAgo,
            userName,
            groupName,
            userPost,
          },
        }}
        className="flex items-center gap-1"
      >
        <BiComment className="text-[1.3rem]" />
        <span className="text-[16px] font-semibold">{postCommentLength}</span>
      </Link>
    </div>
  );
};

export default PostActions;
