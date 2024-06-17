import { HiOutlineUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
const CommunityItemsHeader = () => {
  return (
    <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 mb-5">
      <HiOutlineUserGroup className="text-[20px]" />
      Communities
    </div>
    <div className="relative">
      <Link to="/" className="text-azure-blue">
        See all
      </Link>
      <span
        className="absolute w-4 h-4 bg-azure-blue text-white text-[10px]
       flex items-center justify-center rounded-full -right-3 -top-2"
      >
        10
      </span>
    </div>
  </div>
  )
}

export default CommunityItemsHeader