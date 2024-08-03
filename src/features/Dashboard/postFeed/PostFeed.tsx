import { useEffect } from "react";
import FollowingUserPosts from "./FollowingUserPosts";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchRelevantPosts } from "../../../slices/user/userDataThunks";
import PageDataLoader from "../../../ui/PageDataLoader";

const PostFeed = () => {
  const {
    loading: { loadingRelevantPosts },
    relevantPosts,
  } = useAppSelector((store) => store.userData);
  const userId = useAppSelector((store) => store.auth.userData?.uid);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(fetchRelevantPosts({ userId }));
    }
  }, [dispatch, userId]);

  if (loadingRelevantPosts) return <PageDataLoader />;

  if (relevantPosts && relevantPosts?.length < 1) {
    return <p>Posts not found</p>;
  }


  return (
    <section className="col-span-2 min-h-full h-full mt-5">
      <FollowingUserPosts relevantPosts={relevantPosts} />
    </section>
  );
};

export default PostFeed;
