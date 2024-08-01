import LikeButton from "../../../../ui/LikeButton";
import { LiaCommentAlt } from "react-icons/lia";

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
        <LiaCommentAlt className="text-[1.3rem]" />
        <span className="text-[16px] font-semibold mb-[2.2px]">
          {postCommentLength || 0}
        </span>
      </div>
    </div>
  );
};

export default PostInteractions;
