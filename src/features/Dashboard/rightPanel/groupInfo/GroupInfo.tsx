import { RiGroup3Fill } from "react-icons/ri";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import GroupRules from "./GroupRules";
import LeaveGroup from "./LeaveGroup";
import PageDataLoader from "../../../../ui/PageDataLoader";
import '../../../../ui/customScrollbar.css'
type GroupInfoTypes = {
  id: string;
};

const GroupInfo = ({ id }: GroupInfoTypes) => {
  const groupInfo = useAppSelector((store) => store.communities.groupById);
  const { loading } = useAppSelector((store) => store.communities.singleGroup);

  if (loading) {
    return <PageDataLoader />;
  }

  const { banner, description, members, name, rules = [] } = groupInfo || {};
  return (
    <div className="p-5 h-[85vh] overflow-y-scroll scrollable">
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
      <LeaveGroup groupId={id} />
      <GroupRules rules={rules} />
    </div>
  );
};

export default GroupInfo;
