import RemovePostBtn from "../../singleCommunityFeed/groupPosts/RemovePostBtn";
import LikePostAction from "./post actions/LikePostAction";
import SavedPostCommentsAction from "./post actions/SavedPostCommentsAction";

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
  groupName,
  likedBy,
  postCommentLength,
  postId,
  timeAgo,
  userName,
  userPost,
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
        <SavedPostCommentsAction
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
      <RemovePostBtn
        postUserId={userId}
        communityId={communityId}
        postId={postId}
      />
    </div>
  );
};

export default SavedPostActions;
