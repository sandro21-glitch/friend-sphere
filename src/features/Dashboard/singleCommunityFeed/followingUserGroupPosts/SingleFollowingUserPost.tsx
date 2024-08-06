import { formatDistanceToNow, parseISO } from "date-fns";
import { SavedPostTypes } from "../../../../slices/posts/postsSlice";
import PostActions from "../groupPosts/PostActions";
import PostHeader from "../groupPosts/PostHeader";
import RemovePostBtn from "../groupPosts/RemovePostBtn";
import UserPost from "../groupPosts/UserPost";

type SingleFollowingUserPostTypes = {
  post: SavedPostTypes;
};

const SingleFollowingUserPost = ({
  post: {
    userName,
    groupName,
    createdAt,
    likedBy,
    postComments,
    postId,
    userId,
    userPost,
    communityId,
  },
}: SingleFollowingUserPostTypes) => {
  const parsedDate = parseISO(createdAt);

  // format the distance to now in a human-readable format
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
    console.log(communityId);
    
  return (
    <li className="border rounded-md p-4 hover:shadow-lg transition-shadow ease-in duration-200">
      <PostHeader userName={userName} groupName={groupName} timeAgo={timeAgo} />
      <UserPost userPost={userPost} />
      <div className="flex items-center justify-between">
        <PostActions
          likedBy={likedBy || []}
          postCommentLength={postComments?.length || 0}
          postId={postId}
          communityId={communityId}
        />
        <RemovePostBtn
          communityId={communityId}
          postUserId={userId}
          postId={postId}
        />
      </div>
    </li>
  );
};

export default SingleFollowingUserPost;
