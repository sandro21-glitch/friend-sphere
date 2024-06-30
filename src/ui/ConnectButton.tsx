import { SlUserFollow } from "react-icons/sl";
import { MdGroups } from "react-icons/md";
type ConnectButtonTypes = {
  name: string;
  follow?: boolean;
  join?: boolean;
  onClick?: () => void;
};

const ConnectButton = ({ name, follow, join, onClick }: ConnectButtonTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-dashed border-azure-blue font-semibold text-azure-blue
     capitalize px-2 py-1 rounded-md flex items-center gap-2 text-[14px] hover:bg-azure-blue hover:text-white transition-all ease-in duration-150"
    >
      {follow && <SlUserFollow className="text-[16px] " />}
      {join && <MdGroups className="text-[16px]" />}
      {name}
    </button>
  );
};

export default ConnectButton;
