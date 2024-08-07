import { SavedPostTypes } from "../../../slices/posts/postsSlice";
import CommentsLink from "../../../ui/CommentsLink";
import ErrorMessage from "../../../ui/ErrorMessage";
import LikeButton from "../../../ui/LikeButton";
import UserPostHeader from "./userPostElements.tsx/UserPostHeader";
import UserPostText from "./userPostElements.tsx/UserPostText";

type FollowingUserPostTypes = {
  relevantPosts: SavedPostTypes[] | null;
};

const FollowingUserPosts = ({ relevantPosts }: FollowingUserPostTypes) => {
  if (!relevantPosts || relevantPosts.length < 1) {
    return (
      <ErrorMessage message="It seems your followed users haven't posted anything recently. Check back later!" />
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {relevantPosts?.map((post) => {
        const {
          userName,
          groupName,
          createdAt,
          userPost,
          likedBy,
          postComments,
          postId,
          communityId,
        } = post;
        return (
          <li
            key={post.postId}
            className="bg-white p-5 border rounded-md hover:shadow-md transition-shadow ease-in duration-200"
          >
            <UserPostHeader
              userName={userName}
              groupName={groupName}
              createdAt={createdAt}
            />
            <UserPostText userPost={userPost} />
            <div className="flex items-center gap-4">
              <LikeButton
                likedBy={likedBy || []}
                postId={postId}
                communityId={communityId}
              />
              <CommentsLink
                communityId={communityId}
                postCommentLength={postComments?.length || 0}
                postId={postId}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FollowingUserPosts;
