import { HiOutlineUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { setIsNavOpen } from "../../../../slices/modals/modalSlice";
const CommunityItemsHeader = () => {
  const communityLength =
    useAppSelector((store) => store.communities.userGroups)?.length || 0;
  const dispatch = useAppDispatch();
  const handleCloseNav = () => {
    const currentWidth = window.innerWidth;

    if (currentWidth < 1024) {
      dispatch(setIsNavOpen(false));
    }
  };

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2 text-[16px]">
        <HiOutlineUserGroup className="text-[20px]" />
        Communities
      </div>
      <div className="relative">
        <Link
          to="/communities"
          onClick={handleCloseNav}
          className="text-azure-blue text-[13px]"
        >
          See all
        </Link>
        <span
          className="absolute w-4 h-4 bg-azure-blue text-white text-[10px]
       flex items-center justify-center rounded-full -right-3 -top-2"
        >
          {communityLength}
        </span>
      </div>
    </div>
  );
};

export default CommunityItemsHeader;
