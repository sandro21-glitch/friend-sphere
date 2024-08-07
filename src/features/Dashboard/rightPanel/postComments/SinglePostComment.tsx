import { formatDistanceToNow, parseISO } from "date-fns";
import SinglePostCommentTexts from "./SinglePostCommentTexts";
import { Link } from "react-router-dom";

type SingleCommentTypes = {
  comment: {
    userComment: string;
    userId: string;
    userName: string;
    postedAt?: string;
  };
};

const SinglePostComment = ({ comment }: SingleCommentTypes) => {
  const { userComment, userName, postedAt, userId } = comment || {};
  const parsedDate =
    postedAt && !isNaN(Date.parse(postedAt)) ? parseISO(postedAt) : new Date();

  // format the distance to now in a human-readable format
  const commentedAt = formatDistanceToNow(parsedDate, { addSuffix: true });

  return (
    <li className="border-b pb-2 mb-2">
      <Link to={`/user/${userId}`} className="flex items-start mb-2">
        <img
          src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
          alt="user avatar"
          className="w-9 h-9 mr-2"
        />
        <div className="leading-[18px]">
          <p className="text-[.9rem] font-medium">{userName}</p>
          <p className="text-[.7rem] text-gray-500">
            {commentedAt.replace("about", "")}
          </p>
        </div>
      </Link>
      <SinglePostCommentTexts userComment={userComment} />
    </li>
  );
};

export default SinglePostComment;
