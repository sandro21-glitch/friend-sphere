import { BiComment } from "react-icons/bi";
import { Link } from "react-router-dom";
import LikeButton from "../../../../ui/LikeButton";

export interface PostActionTypes {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;
  timeAgo: string;
  userName: string;
  groupName: string;
  userPost: string;
}

const PostActions = ({
  likedBy,
  postCommentLength,
  postId,
  communityId,
  timeAgo,
  userName,
  groupName,
  userPost,
}: PostActionTypes) => {
  return (
    <div className="flex items-center gap-4">
      <LikeButton likedBy={likedBy} postId={postId} communityId={communityId} />
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
    </div>
  );
};

export default PostActions;
