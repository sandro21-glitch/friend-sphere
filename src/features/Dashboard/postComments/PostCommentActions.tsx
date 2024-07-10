import { BiComment, BiLike } from "react-icons/bi";
import { CiSaveDown2 } from "react-icons/ci";
import ActionDropdown from "../../../ui/ActionDropdown";

type PostCommentActionTypes = {
  likedBy: string[];
  postCommentLength: number;
};

const PostCommentActions = ({
  likedBy,
  postCommentLength,
}: PostCommentActionTypes) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-5">
        <button type="button" className="flex items-center gap-1">
          <BiLike className=" text-[1.5rem]" />
          <span className="text-[16px] font-semibold">
            {likedBy.length || 0}
          </span>
        </button>
        <div className="flex items-center gap-1">
          <BiComment className="text-[1.3rem]" />
          <span className="text-[16px] font-semibold">
            {postCommentLength || 0}
          </span>
        </div>
      </div>
      <button type="button" className="flex items-center gap-1 relative group">
        <CiSaveDown2 className=" text-[1.5rem]" />
        <ActionDropdown dropdownText="Save post" />
      </button>
    </div>
  );
};

export default PostCommentActions;
