import { BiComment } from "react-icons/bi";
import { CiSaveDown2 } from "react-icons/ci";
import ActionDropdown from "../../../ui/ActionDropdown";

import LikeButton from "../../../ui/LikeButton";

type PostCommentActionTypes = {
  likedBy: string[];
  postCommentLength: number;
  postId: string;
  communityId: string;
};

const PostCommentActions = ({
  likedBy,
  postCommentLength,
  postId,
  communityId,
}: PostCommentActionTypes) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-5">
        <LikeButton
          likedBy={likedBy}
          postId={postId}
          communityId={communityId}
        />
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
