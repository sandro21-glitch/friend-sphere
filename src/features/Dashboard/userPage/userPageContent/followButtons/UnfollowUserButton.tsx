import { SlUserFollow } from "react-icons/sl";
import Tooltip from "../../../../../ui/Tooltip";

type UnfollowUserButtonTypes = {
  name: string;
  uid: string;
};

const UnfollowUserButton = ({ name, uid }: UnfollowUserButtonTypes) => {
  console.log(uid);

  return (
    <button
      type="button"
      className="absolute bottom-0 -right-3 border border-azure-blue w-8 h-8 rounded-full cursor-pointer flex items-center justify-center group"
    >
      <SlUserFollow className="text-azure-blue" />
      {/* Tooltip */}
      <Tooltip action="follow" message={name} />
    </button>
  );
};

export default UnfollowUserButton;
