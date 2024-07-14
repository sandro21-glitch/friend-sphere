import { formatDistanceToNow, parseISO } from "date-fns";
import { UserPostTypes } from "../../../slices/posts/postsSlice";
import SavedPostHeader from "./singleSavedPost/SavedPostHeader";
import SavedPostText from "./singleSavedPost/SavedPostText";
import SavedPostActions from "./singleSavedPost/SavedPostActions";

type SingleSavedPostTypes = {
  post: UserPostTypes;
};

const SingleSavedPost = ({
  post: { createdAt, groupName, likedBy, postId, userId, userName, userPost },
}: SingleSavedPostTypes) => {
  const parsedDate = parseISO(createdAt);

  // format the distance to now in a human-readable format
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  return (
    <li className="border rounded-md p-4 hover:shadow-lg transition-shadow ease-in duration-200">
      <SavedPostHeader
        userName={userName}
        groupName={groupName}
        timeAgo={timeAgo}
      />
      <SavedPostText userPost={userPost} />
      <SavedPostActions
        likedBy={likedBy || []}
        postCommentLength={1}
        postId={postId}
        communityId="test"
        timeAgo={timeAgo}
        userName={userName}
        groupName={groupName}
        userPost={userPost}
        userId={userId}
      />
    </li>
  );
};

export default SingleSavedPost;
