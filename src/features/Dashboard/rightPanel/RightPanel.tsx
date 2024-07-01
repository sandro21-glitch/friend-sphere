import { useLocation } from "react-router-dom";
import Connections from "./Connections";
import GroupInfo from "./GroupInfo";

const RightPanel = () => {
  const location = useLocation();
  const isSingleCommunityPage = location.pathname.startsWith("/community");
  const id = location.state?.id;

  return (
    <div className="bg-white col-span-1 h-[85vh] sticky top-[5rem] border rounded-md">
      {isSingleCommunityPage ? <GroupInfo id={id} /> : <Connections />}
    </div>
  );
};

export default RightPanel;
