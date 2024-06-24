import { CiLocationOn } from "react-icons/ci";
import { useAppSelector } from "../../../../hooks/reduxHooks";
const UserLocation = () => {
  const { userData } = useAppSelector((store) => store.auth);

  return (
    <div className="mb-3">
      <p className="text-[16px] font-semibold">Location</p>
      <p className="text-[14px] flex items-center gap-1">
        <CiLocationOn />
        {userData?.location || "Location not added"}
      </p>
    </div>
  );
};

export default UserLocation;
