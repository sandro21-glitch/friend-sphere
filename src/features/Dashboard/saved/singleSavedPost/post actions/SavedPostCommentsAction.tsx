import { BiComment } from "react-icons/bi";
import { Link } from "react-router-dom";

type PostCommentsActionTypes = {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;
  timeAgo: string;
  userName: string;
  groupName: string;
  userPost: string;
};

const SavedPostCommentsAction = ({
  groupName,
  likedBy,
  postId,
  timeAgo,
  userName,
  userPost,
  communityId,
  postCommentLength,
}: PostCommentsActionTypes) => {
  return (
    <Link
      to={`/post/${postId}`}
      state={{
        postInfo: {
          likedBy,
          postCommentLength,
          postId,
          communityId,
          timeAgo,
          userName,
          groupName,
          userPost,
        },
      }}
      className="flex items-center gap-1"
    >
      <BiComment className="text-[1.3rem]" />
      <span className="text-[16px] font-semibold">{postCommentLength}</span>
    </Link>
  );
};

export default SavedPostCommentsAction;
