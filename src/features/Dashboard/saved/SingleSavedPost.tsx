import { formatDistanceToNow, parseISO } from "date-fns";
import { UserPostTypes } from "../../../slices/posts/postsSlice";
import LikeButton from "../../../ui/LikeButton";
import { Link } from "react-router-dom";
import RemovePostBtn from "../singleCommunityFeed/groupPosts/RemovePostBtn";
import { BiComment } from "react-icons/bi";

type SingleSavedPostTypes = {
  post: UserPostTypes;
};

const SingleSavedPost = ({
  post: {
    createdAt,
    groupName,
    likedBy,
    postComments,
    postId,
    userId,
    userName,
    userPost,
  },
}: SingleSavedPostTypes) => {
  const parsedDate = parseISO(createdAt);

  // format the distance to now in a human-readable format
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  return (
    <li className="border rounded-md p-4 hover:shadow-lg transition-shadow ease-in duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
            alt="user img"
            className="w-14 h-14 rounded-full"
          />
          <div className="leading-5">
            <p className="font-semibold text-[18px]">{userName}</p>
            <p className="text-[14px]">{groupName}</p>
          </div>
        </div>
        <p className="text-[14px] text-gray-500">
          {timeAgo.replace("about", " ")}
        </p>
      </div>
      <p className="mb-5">{userPost}</p>;
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LikeButton
            likedBy={likedBy || []}
            postId={postId}
            communityId={"test"}
          />
          <Link
            to={`/post/${postId}`}
            state={{
              postInfo: {
                likedBy,
                postCommentLength: 5,
                postId,
                communityId: "test",
                timeAgo,
                userName,
                groupName,
                userPost,
              },
            }}
            className="flex items-center gap-1"
          >
            <BiComment className="text-[1.3rem]" />
            <span className="text-[16px] font-semibold">{5}</span>
          </Link>
        </div>
        <RemovePostBtn
          postUserId={userId}
          communityId={"test"}
          postId={postId}
        />
      </div>
    </li>
  );
};

export default SingleSavedPost;
