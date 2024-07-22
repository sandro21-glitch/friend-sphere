import { UserPostTypes } from "../../../../slices/posts/postsSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import PostHeader from "./PostHeader";
import UserPost from "./UserPost";
import PostActions from "./PostActions";
import RemovePostBtn from "./RemovePostBtn";

type SinglePostTypes = {
  post: UserPostTypes;
  communityId: string;
};
const SingleGroupPost = ({ post, communityId }: SinglePostTypes) => {
  const {
    createdAt,
    userPost,
    userName,
    groupName,
    likedBy,
    postComments,
    postId,
    userId,
  } = post;
  const parsedDate = parseISO(createdAt);

  // format the distance to now in a human-readable format
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

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
          timeAgo={timeAgo}
          userName={userName}
          groupName={groupName}
          userPost={userPost}
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

export default SingleGroupPost;
