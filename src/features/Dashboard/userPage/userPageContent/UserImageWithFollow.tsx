import { SlUserFollow } from "react-icons/sl";
import Tooltip from "../../../../ui/Tooltip";

type UserImageWithFollowProps = {
  name: string;
};

const UserImageWithFollow = ({name}:UserImageWithFollowProps) => {
  return (
    <div className="relative w-fit mb-5">
      <img
        src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
        alt="user image"
        className="w-20 h-20"
      />
      <span className="absolute bottom-0 -right-3 border border-azure-blue w-8 h-8 rounded-full cursor-pointer flex items-center justify-center group">
        <SlUserFollow className="text-azure-blue" />
        {/* Tooltip */}
        <Tooltip action="follow" message={name} />
      </span>
    </div>
  );
};

export default UserImageWithFollow;
