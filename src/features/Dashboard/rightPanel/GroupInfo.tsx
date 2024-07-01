import { RiGroup3Fill } from "react-icons/ri";
import { useAppSelector } from "../../../hooks/reduxHooks";
import GroupRules from "./groupInfo/GroupRules";

type GroupInfoTypes = {
  id: string;
};

const GroupInfo = ({ id }: GroupInfoTypes) => {
  const groupInfo = useAppSelector((state) =>
    state.communities.communityData?.find((group) => group.uid === id)
  );

  const { banner, description, members, name, rules = [] } = groupInfo || {};
  return (
    <div className="p-5 h-[85vh] overflow-y-scroll">
      <h2 className="text-[1.3rem] font-semibold mb-3">{name}</h2>
      <p className="text-azure-blue flex items-center gap-1 text-[16px] mb-3">
        <RiGroup3Fill />
        {members?.length || 0} {members?.length === 1 ? "member" : "members"}
      </p>
      <img
        src={banner}
        alt={name}
        className="h-[10rem] w-full object-cover rounded-md mb-3"
      />
      <p className="text-[16px] mb-3">{description}</p>
      <button
        type="button"
        className="text-[14px] text-center w-full
       border border-red-600 py-[4px] rounded-md text-red-600 hover:bg-red-500 hover:text-white 
       transition-colors ease-in duration-150 mb-3"
      >
        Leave Community
      </button>
      <GroupRules rules={rules} />
    </div>
  );
};

export default GroupInfo;
