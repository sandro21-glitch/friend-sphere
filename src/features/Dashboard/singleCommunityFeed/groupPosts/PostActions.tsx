import LikeButton from "../../../../ui/LikeButton";
import CommentsLink from "../../../../ui/CommentsLink";

export interface PostActionTypes {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;

}

const PostActions = ({
  likedBy,
  postCommentLength,
  postId,
  communityId,

}: PostActionTypes) => {
  return (
    <div className="flex items-center gap-4">
      <LikeButton likedBy={likedBy} postId={postId} communityId={communityId} />
      <CommentsLink communityId={communityId} postCommentLength={postCommentLength} postId={postId} />
    </div>
  );
};

export default PostActions;
