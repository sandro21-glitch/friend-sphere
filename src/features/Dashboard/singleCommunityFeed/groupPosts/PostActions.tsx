import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { likePost } from "../../../../slices/posts/postThunks";

type PostActionTypes = {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;
};

const PostActions = ({
  likedBy,
  postCommentLength,
  postId,
  communityId,
}: PostActionTypes) => {
  const userId = useAppSelector((store) => store.auth.userData?.uid);
  const dispatch = useAppDispatch();
  const handleLikePost = () => {
    if (userId) {
      dispatch(likePost({ postId, userId, communityId }));
    }
  };

  const isPostLiked = likedBy.some((likedId) => likedId === userId);

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={handleLikePost}
        className="flex items-center gap-1"
      >
        {isPostLiked ? (
          <BiSolidLike className=" text-[1.5rem]" />
        ) : (
          <BiLike className=" text-[1.5rem]" />
        )}
        <span className="text-[16px] font-semibold">
          {likedBy?.length || 0}
        </span>
      </button>
      <button className="flex items-center gap-1">
        <BiComment className="text-[1.3rem]" />
        <span className="text-[16px] font-semibold">{postCommentLength}</span>
      </button>
    </div>
  );
};

export default PostActions;
