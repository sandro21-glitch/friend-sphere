import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import {
  setDeletePostModal,
  setJoinCommunityModal,
  setLeaveCommunity,
  setUpdateProfileModal,
} from "../../slices/modals/modalSlice";
import DeletePostPopup from "./deletePostPopup/DeletePostPopup";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup";
import JoinCommunityPopup from "./joinCommunityPopup/JoinCommunityPopup";
import LeaveGroupPopup from "./leaveGroup/LeaveGroupPopup";

const Modals = () => {
  const dispatch = useAppDispatch();
  const { updateProfileModal, joinCommunity, leaveCommunity, deletePostModal } =
    useAppSelector((store) => store.modals);
  const isAnyModalOpen =
    updateProfileModal ||
    joinCommunity.isModalOpen ||
    leaveCommunity.isModalOpen ||
    deletePostModal.isModalOpen;
  if (!isAnyModalOpen) return null;

  const handleCloseModals = () => {
    if (updateProfileModal) dispatch(setUpdateProfileModal(false));
    if (joinCommunity.isModalOpen)
      dispatch(
        setJoinCommunityModal({ communityData: null, isModalOpen: false })
      );
    if (leaveCommunity.isModalOpen)
      dispatch(setLeaveCommunity({ dataIds: null, isModalOpen: false }));
    if (deletePostModal.isModalOpen)
      dispatch(setDeletePostModal({ dataIds: null, isModalOpen: false }));
  };

  return (
    <div className="w-full h-full fixed inset-0 flex items-center justify-center z-[9999] min-h-screen">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={handleCloseModals}
      ></div>
      <div className="z-[9999]" onClick={(e) => e.stopPropagation()}>
        {updateProfileModal ? (
          <EditProfilePopup />
        ) : joinCommunity.isModalOpen ? (
          <JoinCommunityPopup />
        ) : leaveCommunity.isModalOpen ? (
          <LeaveGroupPopup />
        ) : deletePostModal.isModalOpen ? (
          <DeletePostPopup />
        ) : null}
      </div>
    </div>
  );
};

export default Modals;
