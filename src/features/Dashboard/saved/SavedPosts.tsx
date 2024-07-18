import { useEffect } from "react";
import DashboardPage from "../../../ui/DashboardPage";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchSavedPostsThunk } from "../../../slices/posts/postThunks";
import SavedPostsList from "./SavedPostsList";
import ErrorMessage from "../../../ui/ErrorMessage";
import PageDataLoader from "../../../ui/PageDataLoader";

const SavedPosts = () => {
  const userId = useAppSelector((store) => store.auth.userData?.uid);
  const dispatch = useAppDispatch();

  const {
    error: { fetchingSavedPostsError },
    loading: { fetchingSavedPosts },
    savedPosts,
  } = useAppSelector((store) => store.posts);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSavedPostsThunk({ userId }));
    }
  }, [dispatch, userId]);

  if (fetchingSavedPostsError)
    return (
      <ErrorMessage
        message={fetchingSavedPostsError || "Failed to fetch posts"}
      />
    );
  if (fetchingSavedPosts) return <PageDataLoader />;

  if (savedPosts === null || savedPosts.length === 0) {
    return <ErrorMessage message="Your saved posts are empty" />;
  }

  return (
    <DashboardPage>
      <h3 className="p-5 border-b text-center text-[1.2rem] font-semibold normal-case">
        Your saved posts
      </h3>
      <SavedPostsList savedPosts={savedPosts} />
    </DashboardPage>
  );
};

export default SavedPosts;
