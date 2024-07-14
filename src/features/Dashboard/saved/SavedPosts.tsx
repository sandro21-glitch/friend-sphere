import { useEffect } from "react";
import DashboardPage from "../../../ui/DashboardPage";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchSavedPostsThunk } from "../../../slices/posts/postThunks";
import PageLoader from "../../../ui/PageLoader";
import SavedPostsList from "./SavedPostsList";

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

  if (fetchingSavedPostsError) return <p>Error..</p>;
  if (fetchingSavedPosts)
    return (
      <DashboardPage>
        <div className="flex items-center justify-center h-full">
          <PageLoader />
        </div>
      </DashboardPage>
    );

  if (savedPosts === null) {
    return (
      <DashboardPage>
        <p className="p-5 border-b text-center text-[1.3rem]">No posts saved</p>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage>
      <h3 className="p-5 border-b text-center text-[1.2rem] font-semibold normal-case">
        Your saved posts
      </h3>
      <SavedPostsList savedPosts={savedPosts || []} />
    </DashboardPage>
  );
};

export default SavedPosts;
