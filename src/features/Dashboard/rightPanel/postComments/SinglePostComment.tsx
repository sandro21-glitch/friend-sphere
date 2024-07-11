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

  return (
    <li className="border-b pb-2 mb-2">
      <div className="flex items-start mb-2">
        <img
          src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
          alt="user avatar"
          className="w-8 h-8 mr-2"
        />
        <div className="leading-5">
          <p className="text-[.9rem] font-medium">{userName}</p>
          <p className="text-[.8rem] text-gray-500">{postedAt}</p>
        </div>
      </div>
      <p className="text-[.9rem]">{userComment}</p>
    </li>
  );
};

export default SinglePostComment;
