import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { likePost } from "../slices/posts/postThunks";
import { setSavedPostLike } from "../slices/posts/postsSlice";

type LikeButtonProps = {
  likedBy: string[];
  postId: string;
  communityId: string;
};

const LikeButton = ({ likedBy, postId, communityId }: LikeButtonProps) => {
  const dispatch = useAppDispatch();
  const {
    loading: { liking },
  } = useAppSelector((store) => store.posts);

  const userId = useAppSelector((store) => store.auth.userData?.uid);

  const [localLiked, setLocalLiked] = useState(
    likedBy.some((likedId) => likedId === userId)
  );
  const [localLikedCount, setLocalLikedCount] = useState(likedBy.length);

  const handleLikePost = async () => {
    if (!userId) return;

    setLocalLiked(!localLiked);
    setLocalLikedCount(localLiked ? localLikedCount - 1 : localLikedCount + 1);
    
    dispatch(setSavedPostLike({ postId, userId }));
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
  );
};

export default LikeButton;
