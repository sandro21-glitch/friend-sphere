import { formatDistanceToNow, parseISO } from "date-fns";
import { SavedPostTypes } from "../../../slices/posts/postsSlice";
import SavedPostHeader from "./singleSavedPost/SavedPostHeader";
import SavedPostText from "./singleSavedPost/SavedPostText";
import SavedPostActions from "./singleSavedPost/SavedPostActions";

type SingleSavedPostTypes = {
  post: SavedPostTypes;
};

const SingleSavedPost = ({
  post: {
    createdAt,
    groupName,
    likedBy,
    postId,
    userId,
    userName,
    userPost,
    postComments,
    communityId,
  },
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
        postCommentLength={postComments?.length || 0}
        postId={postId}
        communityId={communityId}
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
