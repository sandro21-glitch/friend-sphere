import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { leaveGroup } from "../../../../slices/community/communityThunks";

type LeaveGroupTypes = {
  groupId: string;
};
const LeaveGroup = ({ groupId }: LeaveGroupTypes) => {
  const uid = useAppSelector((store) => store.auth.userData?.uid);
  const disaptch = useAppDispatch();
  const handleLeaveGroup = () => {
    if (uid) {
      disaptch(leaveGroup({ communityUid: groupId, uid }));
    }
  };

  return (
    <button
      type="button"
      onClick={handleLeaveGroup}
      className="text-[14px] text-center w-full
   border border-red-600 py-[4px] rounded-md text-red-600 hover:bg-red-500 hover:text-white 
   transition-colors ease-in duration-150 mb-3"
    >
      Leave Community
    </button>
  );
};

export default LeaveGroup;
