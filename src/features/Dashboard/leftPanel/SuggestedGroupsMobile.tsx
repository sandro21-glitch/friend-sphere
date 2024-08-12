import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";

const SuggestedGroupsMobile = () => {
  return (
    <Link
      to={"allgroup"}
      className="flex items-center gap-2 text-[16px] text-azure-blue cursor-pointer"
    >
      <MdGroups className="text-black" />
      See all communities
    </Link>
  );
};

export default SuggestedGroupsMobile;
