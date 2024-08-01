import { SlUserFollow } from "react-icons/sl";
import { MdGroups } from "react-icons/md";

type ConnectButtonTypes = {
  name: string;
  follow?: boolean;
  join?: boolean;
  onClick?: () => void;
  loading?: boolean; // Add loading prop
};

const ConnectButton = ({
  name,
  follow,
  join,
  onClick,
  loading,
}: ConnectButtonTypes) => {
  if (loading) {
    return (
      <div className="px-2 py-1 text-center flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-dashed border-azure-blue font-semibold text-azure-blue
     capitalize px-2 py-1 rounded-md flex items-center gap-2 text-[14px] hover:bg-azure-blue hover:text-white transition-all ease-in duration-150"
    >
      {follow && <SlUserFollow className="text-[16px]" />}
      {join && <MdGroups className="text-[16px]" />}
      {name}
    </button>
  );
};

export default ConnectButton;
