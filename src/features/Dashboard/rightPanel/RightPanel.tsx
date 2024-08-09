import { useLocation, useParams } from "react-router-dom";
import GroupInfo from "./groupInfo/GroupInfo";
import Connections from "./connections/Connections";
import PostCommentsAside from "./postComments/PostCommentsAside";
import { useEffect } from "react";
import { fetchTopUsers } from "../../../slices/user/userDataThunks";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";

const RightPanel = () => {
  const location = useLocation();
  const { postId } = useParams<{ postId: string }>();
  const currentUserId = useAppSelector((store) => store.auth.userData?.uid);

  const dispatch = useAppDispatch();

  const isSingleCommunityPage = location.pathname.startsWith("/community");
  const isPostCommentsPage = location.pathname.startsWith("/post");
  const id = isSingleCommunityPage
    ? location.state?.id
    : isPostCommentsPage
    ? postId
    : "";

  // Fetch top users only once when the component mounts
  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchTopUsers(currentUserId));
    }
  }, [dispatch]);

  return (
    <>
      {isSingleCommunityPage ? (
        <GroupInfo id={id} />
      ) : isPostCommentsPage ? (
        <PostCommentsAside />
      ) : (
        <Connections />
      )}
    </>
  );
};

export default RightPanel;
