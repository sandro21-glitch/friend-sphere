import PanelCommunities from "./communityNavList/PanelCommunities";
import PanelNavigation from "./navigation/PanelNavigation";

const LeftPanel = () => {
  return (
    <div className="col-span-1 h-[85vh] sticky top-[5rem] border rounded-md py-5 bg-white">
      <div className="px-5">
        <PanelNavigation />
        <hr />
        <PanelCommunities />
      </div>
    </div>
  );
};

export default LeftPanel;
