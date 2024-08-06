import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { fetchFollowingUsersCommunityPosts } from "../../../../slices/posts/postThunks";
import PageLoader from "../../../../ui/PageLoader";
import EmptyPosts from "./EmptyPosts";

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
    return (
      <EmptyPosts />
    );
  }

  return <div>FollowingUsersGroupPosts</div>;
};

export default FollowingUsersGroupPosts;
