import { useLocation, useParams } from "react-router-dom";
import GroupInfo from "./groupInfo/GroupInfo";
import Connections from "./connections/Connections";
import PostCommentsAside from "./postComments/PostCommentsAside";
import { useEffect } from "react";
import { fetchTopUsers } from "../../../slices/user/userDataThunks";
import { useAppDispatch } from "../../../hooks/reduxHooks";

const RightPanel = () => {
  const location = useLocation();
  const { postId } = useParams<{ postId: string }>();

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
    dispatch(fetchTopUsers());
  }, [dispatch]);

  return (
    <div className="bg-white col-span-1 h-[85vh] sticky top-[5rem] border rounded-md">
      {isSingleCommunityPage ? (
        <GroupInfo id={id} />
      ) : isPostCommentsPage ? (
        <PostCommentsAside postId={id} />
      ) : (
        <Connections />
      )}
    </div>
  );
};

export default RightPanel;
