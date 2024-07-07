import { BiComment, BiLike } from "react-icons/bi";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { likePost } from "../../../../slices/posts/postThunks";

type PostActionTypes = {
  likedByLength: number;
  postCommentLength: number;
  userId: string;
  postId: string;
  communityId: string;
};

const PostActions = ({
  likedByLength,
  postCommentLength,
  userId,
  postId,
  communityId,
}: PostActionTypes) => {
  const dispatch = useAppDispatch();
  const handleLikePost = () => {
    dispatch(likePost({ postId, userId, communityId }));
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={handleLikePost}
        className="flex items-center gap-1"
      >
        <BiLike className=" text-[1.5rem]" />
        <span className="text-[16px] font-semibold">{likedByLength}</span>
      </button>
      <button className="flex items-center gap-1">
        <BiComment className="text-[1.3rem]" />
        <span className="text-[16px] font-semibold">{postCommentLength}</span>
      </button>
    </div>
  );
};

export default PostActions;
