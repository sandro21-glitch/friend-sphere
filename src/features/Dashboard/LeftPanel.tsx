import PanelCommunities from "./leftPanel/PanelCommunities";
import PanelNavigation from "./leftPanel/PanelNavigation";

const LeftPanel = () => {
  return (
    <div className="col-span-1 h-[85vh] sticky top-[5rem] border rounded-md py-5 bg-white">
      <div className="p-5">
        <PanelNavigation />
        <hr />
        <PanelCommunities />
      </div>
    </div>
  );
};

export default LeftPanel;
