
import { PostType } from "../../../../slices/community/communityTypes";
import SingleGroupPost from "./SingleGroupPost";

type GroupPostTypes = {
  communityId: string;
  posts: PostType[];
};
const GroupPosts = ({ posts, communityId }: GroupPostTypes) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-5 px-2 text-center">
        <p className="text-gray-500 italic">
          No posts available. Be the first to post!
        </p>
      </div>
    );
  }
  return (
    <div className="py-5 px-2">
      <ul className="flex flex-col gap-5 ">
        {posts
          .slice()
          .reverse()
          .map((post) => {
            return (
              <SingleGroupPost
                key={post.postId}
                post={post}
                communityId={communityId}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default GroupPosts;
