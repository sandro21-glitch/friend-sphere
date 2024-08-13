import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setIsNavOpen } from "../../../slices/modals/modalSlice";

const SuggestedGroupsMobile = () => {
  const dispatch = useAppDispatch();

  const handleCloseNav = () => {
    const currentWidth = window.innerWidth;

    if (currentWidth < 1024) {
      dispatch(setIsNavOpen(false));
    }
  };

  return (
    <Link
      to={"allgroup"}
      onClick={handleCloseNav}
      className="flex items-center gap-2 text-[16px] text-azure-blue cursor-pointer"
    >
      <MdGroups className="text-black" />
      See all communities
    </Link>
  );
};

export default SuggestedGroupsMobile;
