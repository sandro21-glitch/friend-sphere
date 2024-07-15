import { Link } from "react-router-dom";
import { BiComment } from "react-icons/bi";

interface PostLinkProps {
  postId: string;
  likedBy: string[];
  postCommentLength: number;
  communityId: string;
  timeAgo: string;
  userName: string;
  groupName: string;
  userPost: string;
}

const CommentsLink: React.FC<PostLinkProps> = ({
  postId,
  likedBy,
  postCommentLength,
  communityId,
  timeAgo,
  userName,
  groupName,
  userPost,
}) => {
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

export default CommentsLink;
