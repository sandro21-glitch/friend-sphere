import { UserPostTypes } from "../../../../slices/posts/postsSlice";
import { formatDistanceToNow, parseISO } from "date-fns";
import PostHeader from "./PostHeader";
import UserPost from "./UserPost";
import PostActions from "./PostActions";

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
  } = post;
  const parsedDate = parseISO(createdAt);

  // Format the distance to now in a human-readable format
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  return (
    <li className="border rounded-md p-4 hover:shadow-lg transition-shadow ease-in duration-200">
      <PostHeader userName={userName} groupName={groupName} timeAgo={timeAgo} />
      <UserPost userPost={userPost} />
      <PostActions
        likedBy={likedBy || []}
        postCommentLength={postComments?.length || 0}
        postId={postId}
        communityId={communityId}
      />
    </li>
  );
};

export default SingleGroupPost;
