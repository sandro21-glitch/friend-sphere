import { useEffect } from "react";
import DashboardPage from "../../../ui/DashboardPage";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchSavedPostsThunk } from "../../../slices/posts/postThunks";
import PageLoader from "../../../ui/PageLoader";

const SavedPosts = () => {
  const userId = useAppSelector((store) => store.auth.userData?.uid);
  const dispatch = useAppDispatch();

  const {
    error: { fetchingSavedPostsError },
    loading: { fetchingSavedPosts },
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

  return <DashboardPage>SavedPosts</DashboardPage>;
};

export default SavedPosts;
