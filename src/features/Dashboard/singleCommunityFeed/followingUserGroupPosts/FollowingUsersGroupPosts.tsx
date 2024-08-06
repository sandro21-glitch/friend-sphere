import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { fetchFollowingUsersCommunityPosts } from "../../../../slices/posts/postThunks";
import PageLoader from "../../../../ui/PageLoader";
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
      <section className="col-span-2 min-h-full h-full mt-5 bg-white flex items-center justify-center">
        <PageLoader />
      </section>
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
