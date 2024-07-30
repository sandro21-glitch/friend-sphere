import { formatDistanceToNow } from "date-fns";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";

type CommentsHeaderTypes = {
  groupName: string;
  userName: string;
  createdAt: string;
  communityId: string;
  id: string;
};

const PostCommentsHeader = ({
  groupName,
  createdAt,
  userName,
  communityId,
  id,
}: CommentsHeaderTypes) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const currentUserId = useAppSelector((store) => store.auth.userData?.uid);

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const url = id === currentUserId ? "/profile" : `/user/${id}`;

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
          <Link to={url}>
            <img
              src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
              alt="user image"
              className="w-14 h-14 mr-1"
            />
          </Link>
          <div className="flex flex-col leading-5">
            <Link to={url} className="text-[1rem] font-medium">
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
