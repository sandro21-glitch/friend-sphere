import { useLocation, useParams } from "react-router-dom";
import GroupInfo from "./groupInfo/GroupInfo";
import Connections from "./connections/Connections";
import PostCommentsAside from "./postComments/PostCommentsAside";

const RightPanel = () => {
  const location = useLocation();
  const { postId } = useParams<{ postId: string }>();

  const isSingleCommunityPage = location.pathname.startsWith("/community");
  const isPostCommentsPage = location.pathname.startsWith("/post");
  const id = isSingleCommunityPage
    ? location.state?.id
    : isPostCommentsPage
    ? postId
    : "";

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
