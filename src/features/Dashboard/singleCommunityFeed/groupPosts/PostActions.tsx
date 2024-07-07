import { BiComment, BiLike } from "react-icons/bi";

type PostActionTypes = {
  likedByLength: number;
  postCommentLength: number;
};

const PostActions = ({ likedByLength, postCommentLength }: PostActionTypes) => {
  return (
    <div className="flex items-center gap-4">
      <button className="flex items-center gap-1">
        <BiLike className=" text-[1.5rem]" />
        <span className="text-[16px] font-semibold">{likedByLength}</span>
      </button>
      <button className="flex items-center gap-1">
        <BiComment className="text-[1.3rem]" />
        <span className="text-[16px] font-semibold">{postCommentLength}</span>
      </button>
    </div>
  );
};

export default PostActions;
