import { BiComment } from "react-icons/bi";
import LikeButton from "../../../../ui/LikeButton";

type PostInteractionsTypes = {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;
};

const PostInteractions = ({
  communityId,
  likedBy,
  postCommentLength,
  postId,
}: PostInteractionsTypes) => {
  return (
    <div className="flex items-center gap-5">
      <LikeButton likedBy={likedBy} postId={postId} communityId={communityId} />
      <div className="flex items-center gap-1">
        <BiComment className="text-[1.3rem]" />
        <span className="text-[16px] font-semibold">
          {postCommentLength || 0}
        </span>
      </div>
    </div>
  );
};

export default PostInteractions;
