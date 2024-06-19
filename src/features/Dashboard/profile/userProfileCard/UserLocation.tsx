import { CiLocationOn } from "react-icons/ci";
const UserLocation = () => {
  return (
    <div className="mb-3">
      <p className="text-[16px] font-semibold">Location</p>
      <p className="text-[14px] flex items-center gap-1">
        <CiLocationOn />
        Somewhere
      </p>
    </div>
  );
};

export default UserLocation;
