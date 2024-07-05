import { useAppSelector } from "../../hooks/reduxHooks";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup";
import JoinCommunityPopup from "./joinCommunityPopup/JoinCommunityPopup";
import LeaveGroupPopup from "./leaveGroup/LeaveGroupPopup";

const Modals = () => {
  const { updateProfileModal, joinCommunity, leaveCommunity } = useAppSelector(
    (store) => store.modals
  );
  const isAnyModalOpen =
    updateProfileModal ||
    joinCommunity.isModalOpen ||
    leaveCommunity.isModalOpen;
  if (!isAnyModalOpen) return null;
  return (
    <div className="w-full h-full fixed inset-0 flex items-center justify-center z-[9999] min-h-screen">
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="z-[9999]">
        {updateProfileModal ? (
          <EditProfilePopup />
        ) : joinCommunity.isModalOpen ? (
          <JoinCommunityPopup />
        ) : leaveCommunity.isModalOpen ? (
          <LeaveGroupPopup />
        ) : null}
      </div>
    </div>
  );
};

export default Modals;
