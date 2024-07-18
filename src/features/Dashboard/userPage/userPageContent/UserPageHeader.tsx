import { SlUserFollow } from "react-icons/sl";
import ActionDropdown from "../../../../ui/ActionDropdown";
import { CiLocationOn } from "react-icons/ci";

type UserPageHeaderTypes = {
  name: string;
  location: string;
};
const UserPageHeader = ({ name, location }: UserPageHeaderTypes) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-fit mb-5 group">
        <img
          src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
          alt="user image"
          className="w-20 h-20"
        />
        <span className="absolute bottom-0 -right-3 border border-azure-blue w-8 h-8 rounded-full cursor-pointer flex items-center justify-center">
          <SlUserFollow className="text-azure-blue" />
        </span>
        <ActionDropdown
          dropdownText={`Follow ${name}`}
          classnames="top-[20%] -right-[47%]  font-bold"
        />
      </div>
      <div className="flex items-center flex-col">
        <h3 className="text-lg font-semibold">{name}</h3>
        <h6 className="flex items-center text-gray-500">
          <CiLocationOn /> {location}
        </h6>
      </div>
    </div>
  );
};

export default UserPageHeader;
