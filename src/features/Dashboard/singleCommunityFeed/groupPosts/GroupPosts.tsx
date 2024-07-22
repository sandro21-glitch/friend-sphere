import { PostType } from "../../../../slices/community/communitySlice";
import SingleGroupPost from "./SingleGroupPost";

type GroupPostTypes = {
  communityId: string;
  posts: PostType[];
};
const GroupPosts = ({ posts, communityId }: GroupPostTypes) => {
  if (!posts) return <p>No posts</p>;

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
