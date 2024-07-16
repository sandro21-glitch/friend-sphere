import LikeButton from "../../../../../ui/LikeButton";

type LikePostActionTypes = {
  likedBy: string[];
  postId: string;
  communityId: string;
};
const LikePostAction = ({
  likedBy,
  postId,
  communityId,
}: LikePostActionTypes) => {
  return (
    <LikeButton
      likedBy={likedBy || []}
      postId={postId}
      communityId={communityId}
    />
  );
};

export default LikePostAction;
