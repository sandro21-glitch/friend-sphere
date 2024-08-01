import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { likePost } from "../slices/posts/postThunks";
import { setSavedPostLike } from "../slices/posts/postsSlice";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { motion, useAnimation } from "framer-motion";

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

  const controls = useAnimation();

  const handleLikePost = async () => {
    if (!userId) return;
    const wasLiked = localLiked;

    // Update state immediately
    setLocalLiked(!wasLiked);
    setLocalLikedCount(wasLiked ? localLikedCount - 1 : localLikedCount + 1);

    // Trigger the heart animation immediately
    controls.start({
      y: [0, -50], // Move up
      opacity: [1, 0], // Fade out
      scale: [1, 1.5], // Slight scale increase
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    });

    // Update like status in the backend
    dispatch(setSavedPostLike({ postId, userId }));
    try {
      await dispatch(likePost({ postId, userId, communityId })).unwrap();
    } catch (error) {
      // Revert like state if error occurs
      setLocalLiked(wasLiked);
      setLocalLikedCount(wasLiked ? localLikedCount + 1 : localLikedCount - 1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLikePost}
      className="relative flex items-center gap-1"
      disabled={liking}
    >
      {/* Original Like Icon */}
      <div className="text-[1.5rem]">
        {localLiked ? <FcLike /> : <FcLikePlaceholder />}
      </div>
      {/* Animated Heart */}
      <motion.div
        className="absolute text-[1.5rem] top-0 left-0"
        animate={controls}
        initial={{ opacity: 0 }} // Start hidden, so it appears on click
      >
        <FcLike />
      </motion.div>
      <span className="text-[16px] font-semibold">{localLikedCount}</span>
    </button>
  );
};

export default LikeButton;
