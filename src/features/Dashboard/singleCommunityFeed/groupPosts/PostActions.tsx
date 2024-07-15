import LikeButton from "../../../../ui/LikeButton";
import CommentsLink from "../../../../ui/CommentsLink";

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
  return (
    <div className="flex items-center gap-4">
      <LikeButton likedBy={likedBy} postId={postId} communityId={communityId} />
      <CommentsLink
        likedBy={likedBy}
        postCommentLength={postCommentLength}
        postId={postId}
        communityId={communityId}
        timeAgo={timeAgo}
        userName={userName}
        groupName={groupName}
        userPost={userPost}
      />
    </div>
  );
};

export default PostActions;
