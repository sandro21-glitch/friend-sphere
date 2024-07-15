import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

type CommentsHeaderTypes = {
  groupName: string;
  userName: string;
  timeAgo: string;
  communityId: string;
};

const PostCommentsHeader = ({
  groupName,
  timeAgo,
  userName,
  communityId,
}: CommentsHeaderTypes) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={handleGoBack}
        className="w-7 h-7 rounded-full border border-dashed
       border-azure-blue flex items-center justify-center mb-5"
      >
        <IoChevronBack className="text-azure-blue text-[.8rem]" />
      </button>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
            alt="user image"
            className="w-12 h-12 mr-2"
          />
          <div className="flex flex-col">
            <Link to="" className="text-[1rem] font-medium">
              {userName}
            </Link>
            <Link
              state={{ id: communityId }}
              to={`/community/${groupName}`}
              className="text-[.7rem] text-gray-500"
            >
              {groupName}
            </Link>
          </div>
        </div>
        <p className="text-[.8rem] text-gray-500">
          {timeAgo.replace("about", " ")}
        </p>
      </div>
    </div>
  );
};

export default PostCommentsHeader;
