import CommentsLink from "../../../../ui/CommentsLink";
import RemovePostBtn from "../../singleCommunityFeed/groupPosts/RemovePostBtn";
import LikePostAction from "./post actions/LikePostAction";

type SavedPostActionsTypes = {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;
  timeAgo: string;
  userName: string;
  groupName: string;
  userPost: string;
  userId: string;
};

const SavedPostActions = ({
  communityId,
  likedBy,
  postCommentLength,
  postId,

  userId,
}: SavedPostActionsTypes) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <LikePostAction
          communityId={communityId}
          likedBy={likedBy}
          postId={postId}
        />
        <CommentsLink
          postCommentLength={postCommentLength}
          postId={postId}
          communityId={communityId}
        />
      </div>
      <RemovePostBtn
        postUserId={userId}
        communityId={communityId}
        postId={postId}
      />
    </div>
  );
};

export default SavedPostActions;
