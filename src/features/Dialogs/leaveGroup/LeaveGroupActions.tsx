import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { leaveGroup } from "../../../slices/community/communityThunks";
import { setLeaveCommunity } from "../../../slices/modals/modalSlice";
import MiniLoadingSpinner from "../../../ui/MiniLoadingSpinner";

const LeaveGroupActions = () => {
  const { dataIds } = useAppSelector((store) => store.modals.leaveCommunity);
  const { error, loading } = useAppSelector(
    (store) => store.communities.leaveGroup
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLeaveGroup = async () => {
    if (!dataIds) return;
    try {
      await dispatch(
        leaveGroup({ communityUid: dataIds?.communityId, uid: dataIds.userId })
      );
      dispatch(setLeaveCommunity({ dataIds: null, isModalOpen: false }));
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  };

  const handleCancelLeave = () => {
    dispatch(setLeaveCommunity({ dataIds: null, isModalOpen: false }));
  };

  return (
    <div className="flex items-center gap-5">
      {error && <p className="text-red-900">{error}</p>}
      <button
        type="button"
        onClick={handleCancelLeave}
        className="border w-1/2 px-2 py-1 rounded-md text-gray-500 hover:bg-gray-200 text-[14px] transition-colors ease-in duration-150"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleLeaveGroup}
        className="border w-1/2 px-2 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-[14px] transition-colors ease-in duration-150"
      >
        {loading ? <MiniLoadingSpinner loading="Leaving..." /> : "Leave"}
      </button>
    </div>
  );
};

export default LeaveGroupActions;
