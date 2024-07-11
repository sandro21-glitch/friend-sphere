import { useLocation } from "react-router-dom";
import PostCommentActions from "./PostCommentActions";
import PostCommentForm from "./PostCommentForm";
import PostCommentsHeader from "./PostCommentsHeader";
import PostCommentText from "./PostCommentText";
import { PostActionTypes } from "../singleCommunityFeed/groupPosts/PostActions";

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
    <section className="col-span-2 max-h-[85vh] h-full mt-5 bg-white rounded-lg border">
      <div className="p-5">
        <PostCommentsHeader
          groupName={groupName}
          userName={userName}
          timeAgo={timeAgo}
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
    </section>
  );
};

export default PostComments;
