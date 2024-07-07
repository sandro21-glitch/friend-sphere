import { UserPostTypes } from "../../../../slices/posts/postsSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import PostHeader from "./PostHeader";
import UserPost from "./UserPost";
import PostActions from "./PostActions";

type SinglePostTypes = {
  post: UserPostTypes;
};
const SingleGroupPost = ({ post }: SinglePostTypes) => {
  const { createdAt, userPost, userName, groupName, likedBy, postComments } =
    post;
  const parsedDate = parseISO(createdAt);

  // Format the distance to now in a human-readable format
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  return (
    <li className="border rounded-md p-4">
      <PostHeader userName={userName} groupName={groupName} timeAgo={timeAgo} />
      <UserPost userPost={userPost} />
      <PostActions likedByLength={likedBy?.length || 0} postCommentLength={postComments?.length || 0} />
    </li>
  );
};

export default SingleGroupPost;
