import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { fetchFollowingUsersCommunityPosts } from "../../../../slices/posts/postThunks";
import EmptyPosts from "./EmptyPosts";
import SingleFollowingUserPost from "./SingleFollowingUserPost";

type FollowginUsersGroupPostTypes = {
  groupById: string;
};

const FollowingUsersGroupPosts = ({
  groupById,
}: FollowginUsersGroupPostTypes) => {
  const {
    loading: { fetchingFollowedUserPosts },
    error: { fetchingFollowedUserPostsError },
    followedUserGroupPosts,
  } = useAppSelector((store) => store.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (groupById) {
      dispatch(
        fetchFollowingUsersCommunityPosts({
          communityId: groupById,
          offset: undefined,
          limit: 10,
        })
      );
    }
  }, [dispatch, groupById]);

  if (fetchingFollowedUserPosts)
    return (
      <div className="py-5 px-2 text-center flex items-center justify-center gap-3">
        <p className="text-gray-500 italic">Loading posts</p>
        <div className="w-5 h-5 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );

  if (fetchingFollowedUserPostsError) {
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white">
        {fetchingFollowedUserPostsError || "Something went wrong"}
      </section>
    );
  }

  if (followedUserGroupPosts && followedUserGroupPosts.length < 1) {
    return <EmptyPosts />;
  }

  return (
    <ul className="p-5 flex flex-col gap-5">
      {followedUserGroupPosts?.map((post) => {
        return <SingleFollowingUserPost key={post.postId} post={post} />;
      })}
    </ul>
  );
};

export default FollowingUsersGroupPosts;
