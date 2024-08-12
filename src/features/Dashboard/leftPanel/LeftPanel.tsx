import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import PanelCommunities from "./communityNavList/PanelCommunities";
import PanelNavigation from "./navigation/PanelNavigation";
import { MdGroups } from "react-icons/md";

const LeftPanel = () => {
  const { isNavOpen } = useAppSelector((store) => store.modals);

  return (
    <div
      className={`col-span-1 h-[85vh] fixed z-[99999] lg:z-auto w-[65%] sm:w-[50%]
       lg:w-auto left-0 lg:sticky lg:left-auto top-[5rem]
       border rounded-md py-5 bg-white ${isNavOpen ? "block" : "hidden"}`}
    >
      <div className="px-5">
        <PanelNavigation />
        <hr />
        <PanelCommunities />
        <hr />
        <Link
          to={"allgroup"}
          className="flex items-center gap-2 text-[16px] text-azure-blue cursor-pointer"
        >
          <MdGroups className="text-black" />
          See all communities
        </Link>
      </div>
    </div>
  );
};

export default LeftPanel;
