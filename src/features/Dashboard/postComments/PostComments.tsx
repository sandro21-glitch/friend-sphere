import { useLocation } from "react-router-dom";
import PostCommentActions from "./PostCommentActions";
import PostCommentForm from "./PostCommentForm";
import PostCommentsHeader from "./PostCommentsHeader";
import PostCommentText from "./PostCommentText";
import { PostActionTypes } from "../singleCommunityFeed/groupPosts/PostActions";
import DashboardPage from "../../../ui/DashboardPage";

const PostComments = () => {
  const location = useLocation();
  const { postInfo }: { postInfo: PostActionTypes } = location.state || {};

  const {
    communityId,
    groupName,
    likedBy,
    postCommentLength,
    postId,
    timeAgo,
    userPost,
    userName,
  } = postInfo;

  return (
    <DashboardPage>
      <div className="p-5">
        <PostCommentsHeader
          groupName={groupName}
          userName={userName}
          timeAgo={timeAgo}
          communityId={communityId}
        />
        <PostCommentText userPost={userPost} />
        <PostCommentActions
          likedBy={likedBy}
          postCommentLength={postCommentLength}
          postId={postId}
          communityId={communityId}
        />
        <PostCommentForm communityId={communityId} postId={postId} />
      </div>
    </DashboardPage>
  );
};

export default PostComments;
