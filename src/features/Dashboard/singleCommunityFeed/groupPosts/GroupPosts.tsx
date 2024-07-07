import { useAppSelector } from "../../../../hooks/reduxHooks";
import SingleGroupPost from "./SingleGroupPost";

type GroupPostTypes = {
  communityId: string;
};
const GroupPosts = ({ communityId }: GroupPostTypes) => {
  const groupPosts = useAppSelector((store) => store.posts.communityPosts);
  if (!groupPosts) return <p>No posts</p>;

  return (
    <div className="py-5 px-2">
      <ul className="flex flex-col gap-5">
        {groupPosts
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
