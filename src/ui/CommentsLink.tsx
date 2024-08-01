import { Link } from "react-router-dom";
import { LiaCommentAlt } from "react-icons/lia";

interface PostLinkProps {
  postId: string;
  postCommentLength: number;
  communityId: string;
}

const CommentsLink: React.FC<PostLinkProps> = ({
  postId,
  postCommentLength,
  communityId,
}) => {
  return (
    <Link
      to={`/post/${postId}`}
      state={{
        communityId,
        postId,
      }}
      className="flex items-center gap-1"
    >
      <LiaCommentAlt className="text-[1.3rem]" />
      <span className="text-[16px] font-semibold mb-[2.2px]">{postCommentLength}</span>
    </Link>
  );
};

export default CommentsLink;
