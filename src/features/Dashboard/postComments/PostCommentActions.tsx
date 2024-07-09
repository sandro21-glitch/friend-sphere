import { BiComment, BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CiSaveDown2 } from "react-icons/ci";
import ActionDropdown from "../../../ui/ActionDropdown";
const PostCommentActions = () => {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-5">
        <button type="button" className="flex items-center gap-1">
          <BiLike className=" text-[1.5rem]" />
          <span className="text-[16px] font-semibold">5</span>
        </button>
        <Link to={`/post/3}`} className="flex items-center gap-1">
          <BiComment className="text-[1.3rem]" />
          <span className="text-[16px] font-semibold">9</span>
        </Link>
      </div>
      <button type="button" className="flex items-center gap-1 relative group">
        <CiSaveDown2 className=" text-[1.5rem]" />
        <ActionDropdown dropdownText="Save post" />
      </button>
    </div>
  );
};

export default PostCommentActions;
