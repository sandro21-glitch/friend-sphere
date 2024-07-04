import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { joinGroup } from "../../../slices/community/communityThunks";
import { setJoinCommunityModal } from "../../../slices/modals/modalSlice";
import MiniLoadingSpinner from "../../../ui/MiniLoadingSpinner";

type PopupActionTypes = {
  communityId: string;
};

const JoinCommunityPopupActions = ({ communityId }: PopupActionTypes) => {
  const { loading, error } = useAppSelector(
    (store) => store.communities.joinGroup
  );
  const userUid = useAppSelector((store) => store.auth.userData?.uid);
  const dispatch = useAppDispatch();

  const handleJoinCommunity = async () => {
    if (!userUid) return;

    try {
      await dispatch(joinGroup({ uid: userUid, communityUid: communityId }));
      dispatch(
        setJoinCommunityModal({ isModalOpen: false, communityData: null })
      );
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  const handleClosePopup = () => {
    dispatch(
      setJoinCommunityModal({ isModalOpen: false, communityData: null })
    );
  };

  return (
    <div className="flex gap-5">
      {error && (
        <div className="text-red-600 text-sm">
          Error joining community: {error}
        </div>
      )}
      <button
        type="button"
        onClick={handleClosePopup}
        className="bg-white border border-gray-400
         hover:bg-gray-100 transition-colors ease-in duration-150 text-gray-600 px-4 py-2 text-[14px] rounded-md"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleJoinCommunity}
        className="bg-azure-blue hover:bg-deep-blue transition-colors ease-in duration-150
         text-white px-4 py-2 text-[14px] font-semibold rounded-md"
      >
        {loading ? <MiniLoadingSpinner loading="joining" /> : "Join"}
      </button>
    </div>
  );
};

export default JoinCommunityPopupActions;
