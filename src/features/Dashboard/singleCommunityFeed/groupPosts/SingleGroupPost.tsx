import { BiComment, BiLike } from "react-icons/bi";
import { UserPostTypes } from "../../../../slices/posts/postsSlice";

type SinglePostTypes = {
  post: UserPostTypes;
};

const SingleGroupPost = ({ post }: SinglePostTypes) => {
  const { createdAt, userPost, userName, groupName, likedBy,postComments } = post;
  return (
    <li className="border rounded-md p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
            alt="user img"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <p className="font-semibold text-[18px]">{userName}</p>
            <p className="text-[14px]">{groupName}</p>
          </div>
        </div>
        <p className="text-[16px]">{createdAt}</p>
      </div>
      <p className="mb-5">{userPost}</p>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1">
          <BiLike className=" text-[1.5rem]" />
          <span className="text-[16px] font-semibold">
            {likedBy?.length || 0}
          </span>
        </button>
        <button className="flex items-center gap-1">
          <BiComment className="text-[1.3rem]" />
          <span className="text-[16px] font-semibold">
            {postComments?.length || 0}
          </span>
        </button>
      </div>
    </li>
  );
};

export default SingleGroupPost;
