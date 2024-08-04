import { useAppSelector } from "../../../../hooks/reduxHooks";

const FollowingUsersGroupPosts = () => {
  const currUserFollowings = useAppSelector(
    (store) => store.auth.userData?.following || []
  );

  const followingsArray = Object.values(currUserFollowings);

  const communityPosts = useAppSelector(
    (store) => store.posts.communityPosts || []
  );

  // filter posts based on followings
  const followingUserPosts = communityPosts.filter((post) =>
    followingsArray.some((following) => following.userUid === post.userId)
  );

  return <div>FollowingUsersGroupPosts</div>;
};

export default FollowingUsersGroupPosts;
