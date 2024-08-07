import { formatDistanceToNow, parseISO } from "date-fns";
import SinglePostCommentTexts from "./SinglePostCommentTexts";

type SingleCommentTypes = {
  comment: {
    userComment: string;
    userId: string;
    userName: string;
    postedAt?: string;
  };
};

const SinglePostComment = ({ comment }: SingleCommentTypes) => {
  const { userComment, userName, postedAt } = comment || {};
  const parsedDate =
    postedAt && !isNaN(Date.parse(postedAt)) ? parseISO(postedAt) : new Date();

  // format the distance to now in a human-readable format
  const commentedAt = formatDistanceToNow(parsedDate, { addSuffix: true });



  return (
    <li className="border-b pb-2 mb-2">
      <div className="flex items-start mb-2">
        <img
          src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
          alt="user avatar"
          className="w-8 h-8 mr-2"
        />
        <div className="leading-4">
          <p className="text-[.9rem] font-medium">{userName}</p>
          <p className="text-[.7rem] text-gray-500">
            {commentedAt.replace("about", "")}
          </p>
        </div>
      </div>
      <SinglePostCommentTexts userComment={userComment} />
    </li>
  );
};

export default SinglePostComment;
