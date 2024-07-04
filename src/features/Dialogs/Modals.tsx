import { useAppSelector } from "../../hooks/reduxHooks";
import EditProfilePopup from "./EditProfilePopup";
import JoinCommunityPopup from "./joinCommunityPopup/JoinCommunityPopup";

const Modals = () => {
  const { updateProfileModal, joinCommunity } = useAppSelector(
    (store) => store.modals
  );
  const isAnyModalOpen = updateProfileModal || joinCommunity.isModalOpen;
  if (!isAnyModalOpen) return null;
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center z-[9999] min-h-screen">
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="z-[9999]">
        {updateProfileModal ? (
          <EditProfilePopup />
        ) : joinCommunity.isModalOpen ? (
          <JoinCommunityPopup />
        ) : null}
      </div>
    </div>
  );
};

export default Modals;
